// * ************************************************
// *  Routing using Express Router
// * ************************************************
const express = require("express");
const userController = require("../controller/user-controller");
const router = express.Router();

// * ************************************************
// * Get all users route
// * ************************************************
router.get("/", userController.getAllUsers);

// * ************************************************
// * Create a new user route
// * ************************************************
router.post("/create", userController.createUser);

// * ************************************************
// * Get user details route
// * ************************************************
router.get("/:id", userController.getUserDetails);

// * ************************************************
// * Update a user route
// * ************************************************
router.put("/:id", userController.updateUser);

// * ************************************************
// * Delete a user route
// * ************************************************
router.delete("/:id", userController.deleteUser);

module.exports = router;
