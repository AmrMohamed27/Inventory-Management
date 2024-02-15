const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController.js");

/* GET categories listing. */
router.get("/", categoryController.category_list);
// GET info of a specific category
router.get("/:id", categoryController.category_detail);
// GET form to Create a new category
router.get("/create", categoryController.category_create_get);
// POST request for creating a category
router.post("/create", categoryController.category_create_post);
// GET form to update info of a specific category
router.get(":id/update", categoryController.category_update_get);
// POST request for updating a specific category
router.post("/:id/update", categoryController.category_update_post);
// GET form to delete a category
router.get("/:id/delete", categoryController.category_delete_get);
// POST request for deleting a category
router.post("/:id/delete", categoryController.category_delete_post);
// POST request to add all items of a category to cart
router.get("/:id/add-to-cart", categoryController.category_add_to_cart_post);

module.exports = router;
