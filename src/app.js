const express = require("express");
const router = require("./routes/user-routes");
const errorHandler = require("./middleware/error-handler-middleware");

PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

app.use("/users", router);

// * Uncomment line below to block global error handler. 
// * Make sure to add the error handlers associated to routes
// * in user-route.js
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
