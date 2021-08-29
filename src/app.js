const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const helper = require('../app/helpers/app.helper')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();

const userRoutes = require("../route/user.route");
const roleRoutes = require("../route/role.route");
const allRoutes = require("../route/route.route");
const productRoutes = require("../route/product.route");
const orderRoutes = require("../route/order.route");

app.use("/", express.static(path.join(__dirname, "../client/dist/mobi-star")));
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/route", allRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.post('/api/contact', (req, res) => {
  try {
     helper.sendContactMessage(
       req.body.name,
       req.body.email,
       req.body.sub,
       req.body.message
     );
     res.status(200).send({
       apiStatus: true,
       msg: "send message successfully!",
       data: req.body.message,
     });
  }
  catch (e) {
    res.status(500).send({
      apiStatus: false,
      msg: "send message faild!",
      data:e.messgae
    })
  }
})
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/mobi-star", "index.html"));
})

module.exports = app;
