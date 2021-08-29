const productModel = require("../../db/models/products.model");
const orderModel = require("../../db/models/order.model");
class Product {
  static addProduct = async (req, res) => {
    try {
      const product = await new productModel(req.body);
      await product.save();
      res.status(200).send({
        apiStatus: true,
        msg: "added product successfully",
        data: product,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "addtion faild!",
        data: e.message,
      });
    }
  };
  static getAllProducts = async (req, res) => {
    try {
      //const { page = 1, limit = 10 } = req.query;  .limit(limit * 1).skip((page - 1) * limit);
      const products = await productModel.find();

      res.status(200).send({
        apiStatus: true,
        msg: "Found all products successfully",
        data: {
          total: products.length,
          products,
        },
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "products not found!",
        data: e.message,
      });
    }
  };

  static getSingleProduct = async (req, res) => {
    try {
      const product = await productModel.findById(req.body.id);
      if (!product) throw new Error("This product not found!");
      //console.log(product);
      res.status(200).send({
        apiStatus: true,
        msg: "get product successfully",
        data: product,
        user: req.user._id,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not found!",
        data: e.message,
      });
    }
  };

  static getProductByName = async (req, res) => {
    try {
      const products = await productModel
        .find({
          name: { $regex: ".*" + req.body.data + ".*", $options: "i" },
        })
        .limit(5);
      res.status(200).send({
        apiStatus: true,
        msg: "get product successfully",
        data: products,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not found!",
        data: e.message,
      });
    }
  };

  static editProduct = async (req, res) => {
    try {
      const product = await productModel.findById(req.body.id);
      if (!product) throw new Error("This product not found!");
      product.name = req.body.data.name
      product.companyName = req.body.data.companyName;
      product.features = req.body.data.features;
      product.stock = req.body.data.stock;
      product.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Update product successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not updated!",
        data: e.message,
      });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.body.id);
      res.status(200).send({
        apiStatus: true,
        msg: "deleted product successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not deleted!",
        data: e.message,
      });
    }
  };

  static addRate = async (req, res) => {
    try {
      const product = await productModel.findById(req.body.id);
      if (!product) throw new Error("This product not found!");
      let oldRate = product.rates.filter(
        (r) => r.user_id == `${req.user._id}`
      )[0];
      if (oldRate) {
        let index = product.rates.indexOf(oldRate);
        product.rates[index].rate = true;
      } else {
        product.rates.push({
          user_id: req.user._id,
          rate: true,
        });
      }
      await product.save();
      res.status(200).send({
        apiStatus: true,
        msg: "get product successfully",
        data: product,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not found!",
        data: e.message,
      });
    }
  };

  static deleteRate = async (req, res) => {
    try {
      const product = await productModel.findById(req.body.id);
      if (!product) throw new Error("This product not found!");
      product.rates = product.rates.filter(
        (r) => r.user_id != `${req.user._id}`
      );
      await product.save();
      res.status(200).send({
        apiStatus: true,
        msg: "add rate successfully",
        data: product,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: " This product not rated!",
        data: e.message,
      });
    }
  };
}
module.exports = Product;
