const express = require("express");
const router = express.Router({ mergeParams: true });
const fs = require("fs/promises");
const path = require("path");
const { models } = require("../db");
const { Users } = models;
const { createUserDto, updateUserDto } = require("../dto/user.dto");
const Ajv = require("ajv");

const ajv = new Ajv();
const folderPath = path.join(__dirname, "../", "data", "users");

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const validate = ajv.compile(createUserDto);
    const valid = validate(body);
    if (!valid) {
      console.log(validate.errors);
      return res
        .status(400)
        .json({ success: false, message: "Validation error" });
    }

    const user = await Users.create(body);
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(
      path.join(folderPath, `${user.id}.json`),
      JSON.stringify(user)
    );

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const validate = ajv.compile(updateUserDto);
    const valid = validate(body);
    if (!valid) {
      console.log(validate.errors);
      return res
        .status(400)
        .json({ success: false, message: "Validation error" });
    }

    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists!" });
    }
    user.update(body);
    await user.save();
    await fs.writeFile(
      path.join(folderPath, `${user.id}.json`),
      JSON.stringify(user)
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists!" });
    }
    const filePath = path.join(folderPath, `${user.id}.json`);
    if (require("fs").existsSync(filePath)) {
      await fs.unlink(filePath);
    }
    await user.destroy();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

module.exports = router;
