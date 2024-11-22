const express = require("express");
const router = require("./routes/user-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const path = require("path");
const { MongoClient } = require("mongodb");

PORT = process.env.PORT | 3000;
MONGO_URI = "mongodb://127.0.0.1:27017";
DB_NAME = "express-lecture";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

MongoClient.connect(MONGO_URI)
  .then((client) => {
    console.log("Connected to MongoDB");

    // Adding the database object to express app
    app.locals.db = client.db(DB_NAME);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

app.get("/", (_, res) => {
  res.render("index");
});

app.use("/users", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
