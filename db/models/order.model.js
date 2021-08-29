const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    productId: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    companyName: { type: String, trim: true, required: true },
    stock: {
        color: { type: String, trim: true },
        image: { type: String, trim: true },
        ram: { type: Number, trim: true },
        memory: { type: Number, trim: true },
        price: { type: Number, trim: true, required: true },
        stock: { type: Number },
    },
    totalPrice: { type: Number },
    quantity: { type: Number },
    userId: { type: String, trim: true, required: true },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);
orderSchema.pre("save", async function () {
  const order = this;
  if (order.isModified()) order.updatedAt = Date.now();
});
const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
