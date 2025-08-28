const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
