const express = require("express");
const router = express.Router();
const database = require("../utils/db");
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let material = await database.execute(
      "SELECT * FROM nlinh.` material` where supplier_id = ?",
      [id]
    );
    let [materials] = material;
    res.json({
      status: "success",
      materials,
    });
  } catch (error) {
    res.json({ error });
  }
});
router.post("/updateStock", async (req, res) => {
  try {
    const selectedMaterials = req.body.selectedMaterials;

    // Lặp qua danh sách các vật liệu được chọn và cập nhật số lượng trong kho của nhà cung cấp
    for (let i = 0; i < selectedMaterials.length; i++) {
      const material = selectedMaterials[i];
      const { id, name, quantity } = material;

      // Thực hiện cập nhật số lượng trong kho cho vật liệu có tên là name của nhà cung cấp
      await database.execute(
        "UPDATE nlinh.` material` SET in_stock = in_stock - ? WHERE material_name = ?",
        [quantity, name]
      );
    }

    res.json({
      status: 200,
      message: "Số lượng hàng hóa của nhà cung cấp đã được cập nhật.",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
