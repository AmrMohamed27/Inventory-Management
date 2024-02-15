/**
 * Defines the Mongoose schema and model for the Item document.
 *
 * The Item schema defines the fields stored in each Item document, including
 * name, description, price, stock, category and seller.
 *
 * Virtual is defined to create a url field for each document.
 *
 * The compiled model is exported for use in other parts of the application.
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
});

itemSchema.virtual("url").get(function () {
  return `/catalog/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
