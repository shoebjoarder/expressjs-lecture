// *  User data
let users = [
  {
    id: Date.now(),
    name: "John",
    age: 36,
    address: { street: "Lotherstraße", zipCode: 47057, city: "Duisburg" },
  },
];

// * ************************************************
// * Get all users controller
// * ************************************************
exports.getAllUsers = (_, res) => {
  res.status(200).json({
    message: "Found all users",
    data: users,
  });
};

exports.renderAllUsersPage = (_, res) => {
  res.render("all-users", { title: "All users", users });
};

// * ************************************************
// * Create a user controller
// * ************************************************
exports.createUser = (req, res, next) => {
  const { name, age, address } = req.body;
  try {
    const foundUser = users.find((user) => {
      return user.name === name;
    });
    if (foundUser) {
      let error = new Error(`Name already taken!`);
      error.status = 400;
      throw error;
    }
    users.push({
      id: Date.now(),
      name,
      age,
      address,
    });
    return res.status(201).json({
      message: `New user created: ${name}`,
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Get user detail contoller
// * ************************************************
exports.getUserDetails = (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const foundUser = users.find((user) => {
      return user.id === id;
    });
    if (!foundUser) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
    }
    return res.status(200).json({
      message: "User found",
      data: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Update a user controller
// * ************************************************
exports.updateUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, age, address } = req.body;
  try {
    const userIndex = users.findIndex((user) => {
      return user.id === id;
    });
    if (userIndex === -1) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
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
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Delete a user contoller
// * ************************************************
exports.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const foundUser = users.find((user) => user.id == id);
    if (!foundUser) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
    }
    users = users.filter((user) => user.id !== id);
    return res.status(200).json({
      message: `User deleted with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
