const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/users", require("./users.routes"));

module.exports = router;
