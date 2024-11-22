const User = require("../models/user-model");

// * ************************************************
// * Get all users controller
// * ************************************************
exports.getAllUsers = async (_, res, next) => {
  try {
    const foundUsers = await User.find();

    return res.status(200).json({
      message: "Found users!",
      data: foundUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.renderAllUsersPage = async (_, res, next) => {
  try {
    const users = await User.find();
    res.render("all-users", { title: "All users", users });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Create a user controller
// * ************************************************
exports.createUser = async (req, res, next) => {
  const { name, age, address } = req.body;
  try {
    const foundUser = await User.findOne({ name });
    if (foundUser) {
      let error = new Error(`Name already taken!`);
      error.status = 400;
      throw error;
    }
    const newUser = new User({
      name,
      age,
      address,
    }).save();

    return res.status(201).json({
      message: `New user created: ${name}`,
      data: {
        userId: newUser["_id"],
      },
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Get user detail contoller
// * ************************************************
exports.getUserDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id);
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
exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, age, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      age,
      address,
    });
    if (!updatedUser) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
    }
    return res.status(200).json({
      message: `User updated with id: ${updatedUser["_id"]}`,
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Delete a user contoller
// * ************************************************
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findByIdAndDelete(id);
    if (!foundUser) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
    }

    return res.status(200).json({
      message: `User deleted with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
