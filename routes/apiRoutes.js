const express = require('express');
const app = express();
const productRoutes = require("./product");
const storeRoutes = require("./Store")
const categoryRoutes = require("./Category");
const BrandRoutes = require("./Brand");
const supplierRoutes = require("./Supplier")
const userRoutes = require("./User")
app.use('/products', productRoutes);
app.use("/brands", BrandRoutes)
app.use('/categories', categoryRoutes);
app.use('/stores', storeRoutes);
app.use("/suppliers", supplierRoutes)
app.use("/users", userRoutes)
module.exports = app;