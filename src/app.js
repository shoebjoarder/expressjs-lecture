const express = require("express");
const router = require("./routes/user-routes");

PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

app.use("/users", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
