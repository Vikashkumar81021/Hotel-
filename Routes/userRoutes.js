const express = require("express");
const usermodel = require("../models/User-Model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userdata = req.body;
    const newUser = new usermodel(userdata);
    const response = await newUser.save();
    res.status(200).json(response);
    console.log("user data model is create");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await usermodel.find();
    console.log("data feteched is user model", data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const bodyData = req.body;
    const response = await usermodel.findByIdAndUpdate(data, bodyData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ message: "user not found" });
    }
    console.log("data update from usermodel");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(5000).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const response = await usermodel.findByIdAndDelete(data);
    if (!response) {
      res.status(404).json({ message: "user not found" });
    }
    console.log("data delete from usermodel");
    res.status(200).json({ message: "user delete from user model" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "message" });
  }
});

module.exports = router;
