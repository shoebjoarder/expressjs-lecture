// * ************************************************
// *  Routing using Express Router
// * ************************************************
const express = require("express");
const userController = require("../controller/user-controller");
const authentication = require("../middleware/auth-middleware");
const errorHandler = require("../middleware/error-handler-middleware");
const router = express.Router();

// * ************************************************
// * Get all users route
// * ************************************************
router.get("/", userController.getAllUsers);

// * ************************************************
// * Create a new user route
// * ************************************************
router.post("/create", userController.createUser, errorHandler);

// * ************************************************
// * Get user details route
// * ************************************************
router.get("/:id", authentication, userController.getUserDetails, errorHandler);

// * ************************************************
// * Update a user route
// * ************************************************
router.put("/:id", authentication, userController.updateUser, errorHandler);

// * ************************************************
// * Delete a user route
// * ************************************************
router.delete("/:id", authentication, userController.deleteUser, errorHandler);

module.exports = router;
