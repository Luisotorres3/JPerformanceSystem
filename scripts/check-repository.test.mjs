import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const checker = resolve("scripts/check-repository.mjs");
const ignore = readFileSync(".gitignore");
test("repository guard detects risky files without exposing values", () => {
  const cwd = mkdtempSync(join(tmpdir(), "jps-repo-test-"));
  const git = (...args) => execFileSync("git", ["-c", `safe.directory=${cwd.replaceAll("\\", "/")}`, ...args], { cwd, stdio: "pipe" });
  const check = () => spawnSync(process.execPath, [checker], { cwd, encoding: "utf8" });
  try {
    git("init");
    writeFileSync(join(cwd, ".gitignore"), ignore);
    writeFileSync(join(cwd, ".env.example"), "VITE_EMAILJS_PUBLIC_KEY=\n");
    writeFileSync(join(cwd, ".env.local"), "LOCAL_ONLY=example\n");
    assert.equal(check().status, 0, "ignored local config must not be scanned");
    git("add", "-f", ".env.local");
    assert.equal(check().status, 1, "force-added private config must fail");
    git("rm", "--cached", ".env.local");
    const fakeToken = "ghp_" + "a".repeat(36);
    writeFileSync(join(cwd, "accidental.txt"), fakeToken);
    const result = check();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /accidental.txt:1/);
    assert.equal(result.stderr.includes(fakeToken), false, "never print credential values");
    rmSync(join(cwd, "accidental.txt"));
    assert.equal(check().status, 0);
    const ignoredPaths = [".env.production", "credentials.json", "id_ed25519", "trace.har", "backup.sql", "local/notes.md", "qa.local/screenshot.png"];
    for (const path of ignoredPaths) git("check-ignore", "--no-index", path);
    const example = spawnSync("git", ["-c", `safe.directory=${cwd.replaceAll("\\", "/")}`, "check-ignore", "--no-index", ".env.example"], { cwd });
    assert.equal(example.status, 1, "public example must remain publishable");
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
