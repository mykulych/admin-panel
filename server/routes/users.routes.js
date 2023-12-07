const express = require("express");
const router = express.Router({ mergeParams: true });
const { models } = require("../db");
const { Users } = models;

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exists!" });
    }

    user.update(req.body);
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exists!" });
    }

    await user.destroy();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error?.message });
  }
});

module.exports = router;
