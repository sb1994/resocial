const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello Product Routes" });
});

module.exports = router;
