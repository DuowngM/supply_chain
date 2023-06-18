const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/", async (req, res) => {
  try {
    let supplier = await database.execute("SELECT * FROM supplier");
    let [suppliers] = supplier;
    res.json({
      status: "success",
      suppliers,
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
