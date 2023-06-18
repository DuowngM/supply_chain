const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/", async (req, res) => {
  try {
    let order = await database.execute("SELECT * FROM nlinh.orders");
    let [orders] = order;
    res.json({
      status: "success",
      orders,
    });
  } catch (error) {
    res.json({ error });
  }
});
router.post("/", async (req, res) => {
  try {
    const {
      selectedProducts,
      quantities,
      orderDate,
      totalAmount,
      staffId,
      customerId,
    } = req.body;
    await database.execute(
      "INSERT INTO `nlinh`.`orders` (`order_date`, `total_amount`, `staff_id`, `customer_id`, `status`) VALUES (?, ?, ?, ?,'pending')",
      [orderDate, totalAmount, staffId, customerId]
    );

    // Lấy thông tin của order vừa thêm vào từ database
    const [newOrder] = await database.execute(
      "SELECT * FROM `nlinh`.`orders` ORDER BY `order_id` DESC LIMIT 1"
    );

    // Trả về thông tin của order đó cho client
    res.json({ status: 200, data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await database.execute(
      "UPDATE `nlinh`.`orders` SET `status` = 'completed' WHERE (`order_id` = ?)",
      [id]
    );
    res.status(201).json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
