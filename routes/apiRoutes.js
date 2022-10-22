const express = require('express');
const app = express();
const productRoutes = require("./product");
const storeRoutes = require("./Store")
const categoryRoutes = require("./categoryRoutes");
const BrandRoutes = require("./Brand");
const supplierRoutes = require("./supplierRoutes")
app.use('/products', productRoutes);
app.use("/brands", BrandRoutes)
app.use('/categories', categoryRoutes);
app.use('/stores', storeRoutes);
app.use("/suppliers", supplierRoutes)
module.exports = app;