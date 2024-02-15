/**
 * Defines a Mongoose schema and model for the Category document.
 * The schema defines the fields stored in each document along with their types and constraints.
 * Virtual url field defines a computed property for the category URL.
 * Exports the Category model for use in other parts of the application.
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
});

categorySchema.virtual("url").get(function () {
  return `/catalog/categories/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
