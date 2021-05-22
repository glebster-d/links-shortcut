const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    console.info("Connecting to database...");
    await mongoose.connect(config.get("mongoUri"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.info("Connected to Mongo...");
  } catch (error) {
    console.error("Server Error: ", error.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}...`);
});
