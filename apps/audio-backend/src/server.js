require("dotenv").config();
//console.log(process.env);

const express = require("express");
const app = express();
const path = require("path");
const serveIndex = require("serve-index");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const formidable = require("formidable");
const { q, addQueueEventListeners } = require("./queue");
const { router, authenticateServer } = require("./auth-n/github");

let proxyAppPath = "/api";

// https://github.com/expressjs/serve-index/issues/53
app.use(function (req, res, next) {
  // changed uploads path to work with traefik (TODO is there a middleware solution that works better?)
  req.url = req.url.replace(proxyAppPath, "");

  next();
});

addQueueEventListeners(io);

app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  serveIndex(path.join(__dirname, "..", "uploads"), {
    icons: true,
  })
);

app.post("/upload", function (req, res, next) {
  console.log("BEGIN /upload");
  const form = formidable({ multiples: true, uploadDir: "uploads" });

  /* this is where the renaming happens */
  form.on("fileBegin", function (name, file) {
    //rename the incoming file to the file's name
    file.filepath = form.uploadDir + "/" + file.originalFilename;
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const { newFilename, originalFilename, mimetype, size, filepath } =
      files.filepond;

    console.log({ newFilename, originalFilename, mimetype, size, filepath });

    q.push({ newFilename, originalFilename, mimetype, size, filepath });

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(filepath);
  });
});

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PORT } = process.env;
authenticateServer(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

app.use("/auth/github", router);

// Handle client connections
io.on("connection", (socket) => {
  // Handle client disconnect
  console.log("ws connected");
  socket.on("disconnect", () => {
    // Clean up resources if needed
  });
});

// Start the server
http.listen(PORT ?? 8000, () => {
  console.log("Server is running on http://localhost:" + PORT ?? 8000);
});

// app.listen(PORT??8000, () => {
//   console.log("Server is running on port 8000");
// });
