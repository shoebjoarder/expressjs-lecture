const { ObjectId } = require("mongodb");

// * ************************************************
// * Get all users controller
// * ************************************************
exports.getAllUsers = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const foundUsers = await usersCollection.find().toArray();

    return res.status(200).json({
      message: "Found users!",
      data: foundUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.renderAllUsersPage = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().toArray();

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
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({ name });
    if (foundUser) {
      let error = new Error(`Name already taken!`);
      error.status = 400;
      throw error;
    }
    const newUser = await usersCollection.insertOne({ name, age, address });
    return res.status(201).json({
      message: `New user created: ${name}`,
      data: {
        userId: newUser.insertedId,
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
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({ _id: new ObjectId(id) });
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
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const updatedUser = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age, address } }
    );

    if (updatedUser.matchedCount === 0) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 400;
      throw error;
    }

    return res.status(200).json({
      message: `User updated with id: ${id}`,
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
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
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
