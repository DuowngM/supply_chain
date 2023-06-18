const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Lấy thông tin chi tiết đơn hàng từ cơ sở dữ liệu
    const [orderDetails] = await database.execute(
      "SELECT * FROM order_details WHERE order_id = ?",
      [id]
    );
    res.json({
      status: 200,
      data: orderDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/", async (req, res) => {
  const orderDetails = req.body.orderDetails;
  console.log(orderDetails);
  try {
    // Lưu thông tin chi tiết đơn hàng vào cơ sở dữ liệu
    for (let i = 0; i < orderDetails.length; i++) {
      await database.execute(
        "INSERT INTO order_details (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [
          orderDetails[i].orderId,
          orderDetails[i].productId,
          orderDetails[i].quantity,
        ]
      );
    }
    res.json({
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
