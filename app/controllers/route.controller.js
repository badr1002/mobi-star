const routeModel = require("../../db/models/routes.model");
const roleModel = require("../../db/models/roles.model");

class Route {
  static getAllRouts = async (req, res) => {
    try {
      const routes = await routeModel.find();
      res.status(200).send({
        apiStatus: true,
        msg: "Get routes successfully",
        data: routes,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "get routes faild!",
        data: e.message,
      });
    }
  };

  static addRoute = async (req, res) => {
    try {
      const checkRoute = await routeModel.findOne({ url: req.body.url });
      if (checkRoute) throw new Error("this url is already exist!");
      const route = await routeModel(req.body);
      await route.save();
      //console.log(req.body);
      res.status(200).send({
        apiStatus: true,
        msg: "New route added successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "addation route faild!",
        data: e.message,
      });
    }
  };

  static addRole = async (req, res) => {
    try {
      let route = await routeModel.findById(req.body.id);
      if (!route) throw new Error("This route is not found!");
      const existRole = route.roles.some(r => r == req.body.role)
      if(existRole) throw new Error('This role is already exsit!')
      route.roles = route.roles.concat(req.body.role);
      await route.save();
      res.status(200).send({
        apiStatus: true,
        msg: "role added successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "addation role faild!",
        data: e.message,
      });
    }
  };
  static deleteRoute = async (req, res) => {
    try {
      await routeModel.findByIdAndDelete(req.body.id);
      res.status(200).send({
        apiStatus: true,
        msg: "Route deleted successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Route deleted faild!",
        data: e.message,
      });
    }
  };
  static deleteRole = async (req, res) => {
    try {
      let route = await routeModel.findById(req.body.id);
      if (!route) throw new Error("this route not found!");
      route.roles = route.roles.filter(r => r !== req.body.role);
      await route.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Role deleted successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Role deleted faild!",
        data: e.message,
      });
    }
  };

  
}
module.exports = Route;
