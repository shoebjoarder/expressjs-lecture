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
// * Get all users API
router.get("/", userController.getAllUsers);

// * Render list of all users page
router.get("/render-all-users", userController.renderAllUsersPage);

// * ************************************************
// * Create a new user route
// * ************************************************
router.post("/create", userController.createUser, errorHandler);

// * Uncomment line below and comment line above in case for global error handler
// router.post("/create", userController.createUser);

// * ************************************************
// * Get user details route
// * ************************************************
router.get("/:id", authentication, userController.getUserDetails, errorHandler);

// * Uncomment line below and comment line above in case for global error handler
router.get("/:id", authentication, userController.getUserDetails);

// * ************************************************
// * Update a user route
// * ************************************************
router.put("/:id", authentication, userController.updateUser, errorHandler);

// * Uncomment line below and comment line above in case for global error handler
// router.put("/:id", authentication, userController.updateUser);
// * ************************************************
// * Delete a user route
// * ************************************************
router.delete("/:id", authentication, userController.deleteUser, errorHandler);

// * Uncomment line below and comment line above in case for global error handler
// router.delete("/:id", authentication, userController.deleteUser);

module.exports = router;
