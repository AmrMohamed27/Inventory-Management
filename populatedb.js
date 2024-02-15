const Category = require("./models/categoryModel.js");
const Item = require("./models/itemModel.js");
const User = require("./models/userModel.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  await Users();
  await Categories();
  await Items();
  mongoose.connection.close();
}

const users = [];
const items = [];
const categories = [];

async function createItem(name, description, price, stock, category, seller) {
  const item = new Item({
    name: name,
    description: description,
    price: price,
    stock: stock,
    category: categories[category]._id,
    seller: users[seller]._id,
  });
  items.push(item);
  await item.save();
}

async function createCategory(name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  categories.push(category);
  await category.save();
}

async function createUser(firstName, familyName, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName: firstName,
    familyName: familyName,
    email: email,
    password: hashedPassword,
  });
  users.push(user);
  await user.save();
}

async function Users() {
  await createUser("Admin", "Admin", "admin@localhost", "admin");
  await createUser("User", "User", "user@localhost", "user");
  await createUser("Guest", "Guest", "guest@localhost", "guest");
  await createUser("Test", "Test", "test@localhost", "test");
  await createUser("Test2", "Test2", "test2@localhost", "test2");
}

async function Categories() {
  await createCategory("Food", "Food");
  await createCategory("Clothing", "Clothing");
  await createCategory("Electronics", "Electronics");
  await createCategory("Books", "Books");
}

async function Items() {
  await createItem("Banana", "Yellow fruit", 10, 100, 0, 0);
  await createItem("Apple", "Red fruit", 20, 100, 0, 0);
  await createItem("Orange", "Orange fruit", 30, 100, 0, 0);
  await createItem("Shirt", "Blue shirt", 10, 100, 1, 1);
  await createItem("Pants", "Black pants", 20, 100, 1, 1);
  await createItem("T-Shirt", "White shirt", 30, 100, 1, 1);
  await createItem("Laptop", "Black laptop", 10, 100, 1, 1);
  await createItem("Phone", "White phone", 20, 100, 1, 1);
  await createItem("Tablet", "Black tablet", 30, 100, 1, 1);
  await createItem("Headphones", "Black headphones", 10, 100, 1, 1);
  await createItem("Keyboard", "White keyboard", 20, 100, 1, 1);
  await createItem("Book1", "Book1", 10, 100, 2, 2);
}
