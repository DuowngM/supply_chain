const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/", async (req, res) => {
  try {
    let customer = await database.execute("SELECT * FROM customers");
    let [customers] = customer;
    res.json({
      status: "success",
      customers,
    });
  } catch (error) {
    res.json({ error });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name, phoneNumber, email, address } = req.body;
    // Lấy giá trị cus_id cuối cùng từ cơ sở dữ liệu
    const [lastCustomer] = await database.execute(
      "SELECT cus_id FROM customers ORDER BY cus_id DESC LIMIT 1"
    );
    let cus_id = "CUS001"; // Giá trị cus_id mặc định nếu không có khách hàng nào trong cơ sở dữ liệu
    if (lastCustomer.length > 0) {
      const lastCusId = lastCustomer[0].cus_id;
      const lastNum = parseInt(lastCusId.slice(3));
      cus_id = "CUS" + ("000" + (lastNum + 1)).slice(-3);
    }
    // Thực hiện câu truy vấn INSERT để thêm khách hàng vào cơ sở dữ liệu
    await database.execute(
      "INSERT INTO customers (cus_id, cus_name, cus_phone, cus_email, cus_address) VALUES (?, ?, ?, ?, ?)",
      [cus_id, name, phoneNumber, email, address]
    );

    res.json({
      status: 200,
      message: "Customer added successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
