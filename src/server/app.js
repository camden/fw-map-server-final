import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import getNotionPage from "./getNotionPage.js";

var app = express();

// https://techsparx.com/nodejs/esnext/dirname-es-modules.html
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api/notionPage/:title", getNotionPage);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
