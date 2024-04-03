require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./backend/models/user.model");

const app = express();
app.use(express.json());
app.use(cors());
// body-parser important
// app.use(bodyParser)

connectDb();
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  } catch (error) {
    console.log("db not connected");
  }
}

app.post("/create", async (req, res) => {
  try {
    const { name, age, exp, salary } = req.body;

    // create New entry
    const newUser = await User.create({
      name,
      age,
      exp,
      salary,
    });

    res.send("User Created successFully");
  } catch (error) {
    console.log(error);
  }
});

// find or findOne
app.get("/get", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// delete
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({
      status: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log("error", error);
  }
});

// update
app.put("/update", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.send("User Updated");
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/search", async (req, res) => {
  const { search } = req.query;
  try {
    const users = await User.find({ name: search });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log("server listening " + port);
});
