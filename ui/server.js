//Install express server
const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();
app.use(compression());

// app.use(express.compress());

// Serve only the static files form the dist directory
app.use(express.static("./dist/ui"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/ui/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);
