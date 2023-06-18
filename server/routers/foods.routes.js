const express = require("express");
const router = express.Router();
const database = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    let product = await database.execute(
      "SELECT * FROM product where category_id = 1"
    );
    let [products] = product;
    res.json({
      status: "success",
      products,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/", async (req, res) => {
  try {
    const selectedProducts = req.body.selectedProducts;
    const quantities = req.body.quantities;
    console.log(quantities[selectedProducts]);
    console.log(selectedProducts);
    // Lặp qua danh sách các sản phẩm được chọn và cập nhật số lượng trong kho
    for (let i = 0; i < selectedProducts.length; i++) {
      const productId = selectedProducts[i];
      const quantity = quantities[selectedProducts[i]];
      console.log(productId, quantity);
      // Thực hiện cập nhật số lượng trong kho cho sản phẩm có id là productId
      await database.execute(
        "UPDATE product SET stocks = stocks - ?, sold = sold + ? WHERE id = ?",
        [quantity, quantity, productId]
      );
    }
    res.json({
      status: 200,
      message: "Số lượng sản phẩm đã được cập nhật trong kho.",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
