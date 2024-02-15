/**
 * User schema and model for storing user accounts in MongoDB.
 * Defines fields for user info like name, email, password, etc.
 * Also defines url and full name virtual properties.
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  familyName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  cart: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],
  city: {
    type: String,
    enum: [
      "Alexandria",
      "Cairo",
      "Fayoum",
      "Port Said",
      "Suez",
      "Gouna",
      "Luxor",
      "Aswan",
      "Qena",
      "Asyut",
      "Menya",
      "Matroh",
    ],
    default: "Alexandria",
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "seller"],
    default: "user",
  },
});

userSchema.virtual("name").get(function () {
  // To avoid errors in cases where a user does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullName = "";
  if (this.firstName && this.familyName) {
    fullName = `${this.firstName} ${this.familyName}`;
  }

  return fullName;
});
// Method to add an item to cart
userSchema.methods.addToCart = function (itemId, quantity = 1) {
  const existingItemIndex = this.cart.findIndex(
    (item) => item.itemId.toString() === itemId.toString()
  );
  if (existingItemIndex !== -1) {
    this.cart[existingItemIndex].quantity += quantity;
  } else {
    this.cart.push({ itemId, quantity });
  }
  return this.save();
};
// Method to remove an item from cart
userSchema.methods.removeFromCart = function (itemId) {
  this.cart = this.cart.filter(
    (item) => item.itemId.toString() !== itemId.toString()
  );
  return this.save();
};
// Virtual to get url of a user
userSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/${this._id}`;
});

module.exports = mongoose.model("User", userSchema);
