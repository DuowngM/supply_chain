const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/", async (req, res) => {
  try {
    let staff = await database.execute("SELECT * FROM restaurant_staff");
    let [staffs] = staff;
    res.json({
      status: "success",
      staffs,
    });
  } catch (error) {
    res.json({ error });
  }
});
module.exports = router;
