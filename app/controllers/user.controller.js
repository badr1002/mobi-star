const userModel = require("../../db/models/user.model");
const bcrypt = require("bcryptjs");
const hepler = require("../../app/helpers/app.helper");

class User {
  static getAllUsers = async (req, res) => {
    try {
      //  const { page = 1, limit = 10 } = req.query;
      const users = await userModel.find();
      const allUsers = await userModel.find();
      res.status(200).send({
        apiStatus: true,
        msg: "Found all users successfully",
        data: {
          total: allUsers.length,
          users,
        },
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Users not found!",
        data: e.message,
      });
    }
  };

  static register = async (req, res) => {
    try {
      const checkEmail = await userModel.findOne({ email: req.body.email });
      if (checkEmail) throw new Error("this email is already exist!");
      // const checkMobile = await userModel.findOne({ mobile: req.body.mobile });
      // if (checkMobile) throw new Error("this mobile is used before!");
      await new userModel(req.body);
      res.status(200).send({
        apiStatus: true,
        msg: "registered successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "registered faild!",
        data: e.message,
      });
    }
  };

  

  static login = async (req, res) => {
    try {
      const user = await userModel.findUser(req.body.email, req.body.password);
      if (!user.activate) {
        user.activeKey = user._id;
        hepler.sendMailerToActiveAcoount(user.activeKey, user.email);
      } else if (!user.userStatus)
        throw new Error(
          "This account are blocked! you can contact with us to reEnable it!"
        );
      await user.save();
      let token = await user.generateToken();
      let mac = await user.generateMac();
      res.status(200).send({
        apiStatus: true,
        msg: "loged in successfully",
        data: { user, mac, token },
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "login faild!",
        data: e.message,
      });
    }
  };

  static activateUser = async (req, res) => {
    try {
      const user = await userModel.findOne({
        activeKey: req.params.key,
        activate: false,
      });
      if (!user) throw new Error("no user activate");
      user.activeKey = "";
      user.activate = true;
      await user.save();
      res.status(200).redirect("https://mobi-star.herokuapp.com/");
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "activation faild!",
        data: e.message,
      });
    }
  };

  static logout = async (req, res) => {
    try {
      const user = req.user;
      user.tokens.splice(req.headers.Authorization, 1);
      user.macs.splice(req.headers.Mac, 1);
      await user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "loged out successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "logout faild!",
        data: e.message,
      });
    }
  };

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      req.user.macs = [];
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "logedAll out successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "logoutAll faild!",
        data: e.message,
      });
    }
  };

  static me = async (req, res) => {
    res.status(200).send({
      apiStatus: true,
      data: req.user,
      message: "data fetched",
    });
  };

  static editProfile = async (req, res) => {
    let allowUpdate = [
      "name",
      "mobile",
      "password",
      "oldPassword",
      "address",
      "about",
    ];
    const updates = Object.keys(req.body);
    let isAvailable = updates.every((u) => allowUpdate.includes(u));
    if (!isAvailable) {
      res.status(500).send({
        apiStatus: false,
        msg: "not avaliable!",
        data: {},
      });
      return;
    }

    try {
      const data = req.body;
      let user = await userModel.findById(req.user._id);
      let password = user.password;
      if (!user) throw new Error("user not found");
      if (await data.password) {
        const valid = await bcrypt.compare(data.oldPassword, password);
        if (!valid) throw new Error("invalid password!");
        if (data.oldPassword == data.password)
          throw new Error("Enter a new password");
        user.password = data.password;
      }

      user.name = data.name;
      user.mobile = data.mobile;
      user.address = data.address;
      user.about = data.about;
      await user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "updaeted successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "updaeted faild!",
        data: e.message,
      });
    }
  };

  static getPassword = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) throw new Error("email not found!");
      hepler.sendMailerToSetNewPassword(user._id, req.body.email);
      res.status(200).send({
        apiStatus: true,
        msg: "check your email",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "updaeted faild!",
        data: e.message,
      });
    }
  };

  static checkCode = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.code });
      if (!user) throw new Error("user not found!");

      res.status(200).send({
        apiStatus: true,
        msg: "set new Password",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "invalid code!",
        data: e.message,
      });
    }
  };

  static setPassword = async (req, res) => {
    try {
      const user = await userModel.findById(req.body.code);
      if (!user) throw new Error("user not found!");
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) throw new Error("User deffirant password!");
      user.password = req.body.password;
      user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "password updated successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "updaeted faild!",
        data: e.message,
      });
    }
  };

  static editProfileImage = async (req, res) => {
    try {
      req.user.image = req.file.originalname;
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "updaeted profile image successfully",
        data: req.user.image,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "updaeted faild!",
        data: e.message,
      });
    }
  };

  static enableUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.body.id);
      if (!user) throw new Error("user not found!");
      user.userStatus = true;
      await user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Enabled user successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Enabled user faild!",
        data: e.message,
      });
    }
  };

  static disableUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.body.id);
      if (!user) throw new Error("user not found!");
      user.userStatus = false;
      await user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "Disabled user successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "Disabled user faild!",
        data: e.message,
      });
    }
  };

  static addToComparsion = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) throw new Error("user not found!");
      for (let item of user.comparsion) {
        if (item.product_id == `${req.body.id}`) return;
      }
      if (user.comparsion.length >= 2) {
        user.comparsion = user.comparsion.pop();
      }
      await user.comparsion.push({
        product_id: req.body.id,
        status: true,
      });
      await user.save();
      res.status(200).send({
        apiStatus: true,
        msg: "add product to comparsion successfully",
        data: {},
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        msg: "add product to comparsion found!",
        data: e.message,
      });
    }
  };
}

module.exports = User;
