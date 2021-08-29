const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: { type: String, trim: true, required: true },
    rates: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        rate: { type: Boolean,default:false },
      },
    ],
    stock: [
      {
        color: { type: String, trim: true },
        image: { type: String, trim: true },
        ram: { type: Number, trim: true },
        memory: { type: Number, trim: true },
        price: { type: Number, trim: true, required: true },
        stock: { type: Number },
      },
    ],
    features: {
      cpu: { type: String, trim: true },
      frontCam: { type: Number, trim: true },
      backCam: { type: Number, trim: true },
      battery: { type: Number, trim: true },
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);

productSchema.pre("save", async function () {
  const product = this;
  if (product.isModified()) product.updatedAt = Date.now();
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
