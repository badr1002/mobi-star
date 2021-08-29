const orderModel = require("../../db/models/order.model");
const productModel = require("../../db/models/products.model");

class Order {
  static addOrder = async (req, res) => {
    try {
      const product = await productModel.findById(req.body.id);
      if (!product) throw new Error("This product not found!");
      const sameOrder = await orderModel.find({
        userId: req.user._id,
        productId: req.body.id,
        status: false
      });
      if(sameOrder.length>0) return;
      const stock = product.stock.find(s => s.color == req.body.color)
      const order = await orderModel({
        productId: product._id,
        name: product.name,
        companyName: product.companyName,
        stock:stock,
        quantity: 1,
        totalPrice: stock.price,
        userId: req.user._id,
      });
      await order.save();
      res.status(200).send({
        apiStatus: true,
        msg: "New order added successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "addation order faild!",
        data: e.message,
      });
    }
  };

  static editOrder = async (req, res) => {
    try {
      const order = await orderModel.findByIdAndUpdate(req.body.id, {
        stock: {
          color: req.body.color,
        },
        quantity: req.body.quantity,
        totalPrice: product.stock[0].price * req.body.quantity,
      });
      await order.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Updated order  successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Updated order faild!",
        data: e.message,
      });
    }
  };

  static allOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({
        userId: req.user._id,
      });
      res.status(200).send({
        apiStatus: true,
        msg: "Get All orders successfully",
        data: orders,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Get orders faild!",
        data: e.message,
      });
    }
  };

  static completeOrder = async (req, res) => {
    try {
      let order = await orderModel.findOne(
        {
          _id: req.body.id,
          userId: req.user._id,
        });
      
        order.quantity = req.body.count,
        order.totalPrice = order.stock.price * req.body.count,
        order.status = true,  
        await order.save();
      res.status(200).send({
        apiStatus: true,
        msg: "this order has copmlete successfully",
        data: order,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "complete order faild!",
        data: e.message,
      });
    }
  };

  static allOrdersForAdmin = async (req, res) => {
    try {
      const orders = await orderModel.find();
      res.status(200).send({
        apiStatus: true,
        msg: "Get All orders successfully",
        data: orders,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Get orders faild!",
        data: e.message,
      });
    }
  };

  static deleteOrder = async (req, res) => {
    try {
      const orders = await await orderModel.findOneAndDelete({
        _id: req.body.id,
        userId: req.user._id,
      });
      res.status(200).send({
        apiStatus: true,
        msg: "this order deleted successfully",
        data: orders,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "delete order faild!",
        data: e.message,
      });
    }
  };
}
module.exports = Order;
