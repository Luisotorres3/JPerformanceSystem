import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const git = (...args) => execFileSync("git", ["-c", `safe.directory=${process.cwd().replaceAll("\\", "/")}`, ...args], { encoding: "utf8" });
const files = [...new Set(git("ls-files", "-z", "--cached", "--others", "--exclude-standard").split("\0").filter(Boolean))];
const findings = [];
const ignored = git("ls-files", "-z", "--cached", "--ignored", "--exclude-standard").split("\0").filter(Boolean);
for (const path of ignored) if (existsSync(path)) findings.push(`${path}: tracked despite ignore rules`);
const sensitivePath = /(?:^|\/)(?:\.env(?!\.example$)(?:\..*)?|\.envrc(?:\..*)?|\.npmrc|\.netrc|credentials\.json|service[-_]account[^/]*\.json|id_(?:rsa|ed25519)|[^/]*-firebase-adminsdk-[^/]*\.json)$|\.(?:pem|key|p12|pfx|jks|keystore|kdbx|sql|sqlite3?|db|har|dump|heapsnapshot)$/i;
const patterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,})\b/],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ["private API key", /\b(?:sk_live_|sk-proj-)[A-Za-z0-9_-]{20,}\b/],
];
for (const path of files) {
  if (!existsSync(path)) continue;
  if (sensitivePath.test(path)) findings.push(`${path}: private file type`);
  const content = readFileSync(path);
  if (content.includes(0)) continue;
  const lines = content.toString("utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const [label, pattern] of patterns) {
      if (pattern.test(line)) findings.push(`${path}:${index + 1}: possible ${label} (value hidden)`);
    }
  });
}
if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${files.filter(existsSync).length} publishable files checked; no ignored tracked files or known credential patterns found.`);
}
