import { readFile, writeFile, mkdir } from "node:fs/promises";

const pages = JSON.parse(await readFile("src/data/seo.json", "utf8"));
const shell = await readFile("dist/index.html", "utf8");
const escape = value => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const render = (path, page, noindex = false) => {
  const url = `https://jperformancesystem.es${path === "/" ? "/" : `${path}/`}`;
  return shell.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*/g, `$1${escape(page.description)}`)
    .replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*/g, `$1${escape(page.title)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="robots" content=")[^"]*/, `$1${noindex ? "noindex,follow" : "index,follow"}`);
};
for (const [path, page] of Object.entries(pages)) {
  const directory = path === "/" ? "dist" : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, render(path, page, path === "/checkout"));
}
await writeFile("dist/404.html", render("/404", { title: "Página no encontrada | J Performance System", description: "La página solicitada no existe." }, true));
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).filter(path => path !== "/checkout").map(path => `  <url><loc>https://jperformancesystem.es${path === "/" ? "/" : `${path}/`}</loc></url>`).join("\n")}\n</urlset>\n`);
for (const [alias, destination] of [["/blog", "/retos"], ["/reviews", "/clientes"], ["/futbolistas", "/clientes"]]) {
  await mkdir(`dist${alias}`, { recursive: true });
  const html = render(destination, pages[destination]).replace("</head>", `<meta http-equiv="refresh" content="0;url=${destination}/" /></head>`);
  await writeFile(`dist${alias}/index.html`, html);
}
console.log("Static route entry points, social metadata, sitemap and 404 generated.");
