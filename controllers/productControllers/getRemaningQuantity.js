const { Order } = require("../../models/order");
const { Product } = require("../../models/product");

const getRemainingQuantity = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate the total ordered quantity for this product
    const orders = await Order.find({ "products._id": productId });
    let orderedQuantity = 0;

    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (product._id === productId) {
          orderedQuantity += product.quantity;
        }
      });
    });

    const remainingQuantity = product.quantity - orderedQuantity;

    res.status(200).json({ remainingQuantity });
  } catch (error) {
    console.error("Error fetching remaining quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getRemainingQuantity };
