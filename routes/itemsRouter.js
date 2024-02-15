const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemsController.js");

/* GET items listing. */
router.get("/", itemController.item_list);
// GET info of a specific item
router.get("/:id", itemController.item_detail);
// GET form to Create a new item
router.get("/create", itemController.item_create_get);
// POST request for creating an item
router.post("/create", itemController.item_create_post);
// GET form to update info of a specific item
router.get(":id/update", itemController.item_update_get);
// POST request for updating a specific item
router.post("/:id/update", itemController.item_update_post);
// GET form to delete an item
router.get("/:id/delete", itemController.item_delete_get);
// POST request for deleting an item
router.post("/:id/delete", itemController.item_delete_post);
// GET form to add item to cart
router.get("/:id/add-to-cart", itemController.item_add_to_cart_get);
// POST request to add item to cart
router.post("/:id/add-to-cart", itemController.item_add_to_cart_post);

module.exports = router;
