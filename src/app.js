const express = require("express");

PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

// *  User data
let users = [
  {
    id: Date.now(),
    name: "John",
    age: 36,
    address: { street: "Lotherstraße", zipCode: 47057, city: "Duisburg" },
  },
];

// * *********************************************************************
// *  Basic routing
// * *********************************************************************
// *
// * *********************************************************************
// * Get all users
// * *********************************************************************
app.get("/users", (_, res) => {
  res.status(200).json({
    message: "Found all users",
    data: users,
  });
});

// * *********************************************************************
// * Create a new user
// * *********************************************************************
app.post("/users/create", (req, res) => {
  const { name, age, address } = req.body;
  users.push({
    id: Date.now(),
    name,
    age,
    address,
  });
  res.status(201).json({
    message: `New user created: ${name}`,
  });
});

// * *********************************************************************
// * Get user details
// * *********************************************************************
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundUser = users.find((user) => {
    return user.id === id;
  });
  if (foundUser) {
    return res.status(200).json({
      message: "User found",
      data: foundUser,
    });
  }
  res.status(400).json({
    message: `User not found with id: ${id}`,
  });
});

// * *********************************************************************
// * Update a user
// * *********************************************************************
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, address } = req.body;
  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex === -1) {
    return res.status(404).json({
      message: `User not found with id: ${id}`,
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(age && { age }),
    ...(address && { address }),
  };

  res.status(200).json({
    message: `User updated with id: ${id}`,
  });
});

// * *********************************************************************
// * Delete a user
// * *********************************************************************
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundUser = users.find((user) => user.id == id);
  if (foundUser) {
    users = users.filter((user) => user.id !== id);
    return res.status(200).json({
      message: `User deleted with id: ${id}`,
    });
  }
  res.status(400).json({
    message: `User not found with id: ${id}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
