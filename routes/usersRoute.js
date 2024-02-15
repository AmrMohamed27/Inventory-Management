const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController.js");

/* GET users listing. */
router.get("/", userController.user_list);
// GET info of a specific user
router.get("/:id", userController.user_detail);
// GET form to Create a new user
router.get("/create", userController.user_create_get);
// POST request for creating a user
router.post("/create", userController.user_create_post);
// GET form to update info of a specific user
router.get(":id/update", userController.user_update_get);
// POST request for updating a specific user
router.post("/:id/update", userController.user_update_post);
// GET form to delete a user
router.get("/:id/delete", userController.user_delete_get);
// POST request for deleting a user
router.post("/:id/delete", userController.user_delete_post);

module.exports = router;
