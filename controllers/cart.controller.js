const Cart = require("../models/cart.model");

// Add product to cart
module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyerId = req.user._id;

    let cart = await Cart.findOne({ buyerId });

    if (!cart) {
      cart = await Cart.create({
        buyerId,
        products: [{ productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    // Populate product details
    cart = await cart.populate("products.productId");

    return res.status(200).json({ message: "Product added to cart", success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get cart
module.exports.getCart = async (req, res) => {
  try {
    const buyerId = req.user._id;
    let cart = await Cart.findOne({ buyerId }).populate("products.productId");
    if (!cart) cart = { products: [] }; // safe fallback
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Remove product
module.exports.removeFromCart = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { productId } = req.params;

    let cart = await Cart.findOne({ buyerId });
    if (!cart) return res.status(404).json({ message: "Cart not found", success: false });

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    await cart.save();
    cart = await cart.populate("products.productId");

    return res.status(200).json({ message: "Product removed", success: true, cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Update quantity
module.exports.updateQuantity = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { id } = req.params; // cart product id
    const { quantity } = req.body;

    if (quantity < 1) return res.status(400).json({ message: "Quantity must be >= 1", success: false });

    let cart = await Cart.findOne({ buyerId });
    if (!cart) return res.status(404).json({ message: "Cart not found", success: false });

    const product = cart.products.find((p) => p.productId.toString() === id);
    if (!product) return res.status(404).json({ message: "Product not in cart", success: false });

    product.quantity = quantity;
    await cart.save();
    cart = await cart.populate("products.productId");

    return res.status(200).json({ message: "Quantity updated", success: true, cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
