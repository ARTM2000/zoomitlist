const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const constants = require("./utils/constants");
const postRoutes = require("./routes/posts.rt");
const searchRoutes = require("./routes/search.rt");

const app = express();
app.use(express.static(path.join(__dirname, "public", "build")))

app.use(helmet());
app.disable("x-powered-by");
app.use(
  cors({
    origin: "*",
    methods: "GET, OPTION, PUT",
    allowedHeaders: "Content-Type",
  })
);
app.use("/a", postRoutes);
app.use("/s", searchRoutes);
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
})
app.use("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
})

app.use((err, req, res, next) => {
  res.json(err);
});

const PORT = process.env.PORT || 5003;

mongoose.connect(
  constants.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // reconnectTries: 3000,
  },
  () => {
    app.listen(PORT, () => {
      console.log("server is running");
    });
  }
);
