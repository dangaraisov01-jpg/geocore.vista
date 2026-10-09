import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { readFile, writeFile } from "node:fs/promises";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const rendered = renderToString(createElement(App));
  const html = await readFile("dist/index.html", "utf8");
  if (!html.includes('<div id="root"></div>'))
    throw new Error("Missing render mount");
  await writeFile(
    "dist/index.html",
    html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`),
  );
  console.log("Static public HTML rendered successfully.");
} finally {
  await server.close();
}
