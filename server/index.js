import path from "path";
import fs from "fs";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../app/src/App";

const PORT = 8080;
const app = express();
const router = express.Router();

const serverRenderer = (req, res, next) => {
  const renderedApp = ReactDOMServer.renderToString(<App />);

  fs.readFile(path.resolve("../app/build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    const htmlStr = data.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedApp}</div>`
    );

    return res.send(htmlStr);
  });
};

router.use("^/$", serverRenderer);
router.use(
  express.static(path.resolve(__dirname, "..", "app/build"), { maxAge: "30d" })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
