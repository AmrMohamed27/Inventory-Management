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

userSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/${this._id}`;
});

module.exports = mongoose.model("User", userSchema);
