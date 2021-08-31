const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const macaddress = require("macaddress");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email!");
      },
    },
    password: { type: String, trim: true, required: true, min: 6, max: 50 },
    mobile: {
      type: String,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value.toString(), "ar-EG"))
          throw new Error("invalid mobile!");
      },
    },
    userStatus: { type: Boolean, default: true },
    image: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      state: { type: String, trim: true },
    },
    about: { type: String, trim: true },
    tokens: [{ token: { type: String } }],
    macs: [{ mac: { type: String } }],
    role: {
      type: String,
      trim: true,
      required: true,
      default: "60f0c9ad82601330d46ec62a",
    },
    comparsion: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        status: { type: Boolean, default: false },
      },
    ],
    activeKey: { type: String, Date: Date.now() },
    activate: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, parseFloat(process.env.SALT));
  }
});

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email not found!");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("invalid password!");
  return user;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.generateMac = async function () {
  const user = this;
  let mac = await macaddress.one();
  const oldMac = user.macs.find((m) => m.mac == mac);
  if (!oldMac) {
    user.macs = user.macs.concat({ mac });
    await user.save();
    return mac;
  }
  return mac;
};

const User = mongoose.model("Users", userSchema);
module.exports = User;
