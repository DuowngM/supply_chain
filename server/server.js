const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const customersRoutes = require("./routers/customers.routes");
const foodsRoutes = require("./routers/foods.routes");
const drinksRoutes = require("./routers/drinks.routes");
const productsRoutes = require("./routers/products.routes");
const staffsRoutes = require("./routers/staffs.routes");
const ordersRoutes = require("./routers/orders.routes");
const materialsRoutes = require("./routers/material.routes");
const supplierRoutes = require("./routers/supplier.routes");
const orderDetailRoutes = require("./routers/order-detail.routes");
//----------------------------------------------------------------
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(morgan("dev"));
server.use(cors());
//----------------------------------------------------------------
server.use("/api/v1/customers", customersRoutes);
server.use("/api/v1/foods", foodsRoutes);
server.use("/api/v1/drinks", drinksRoutes);
server.use("/api/v1/products", productsRoutes);
server.use("/api/v1/staffs", staffsRoutes);
server.use("/api/v1/orders", ordersRoutes);
server.use("/api/v1/materials", materialsRoutes);
server.use("/api/v1/suppliers", supplierRoutes);
server.use("/api/v1/order-details", orderDetailRoutes);
server.listen(8000, () => {
  console.log("http://localhost:8000");
});
