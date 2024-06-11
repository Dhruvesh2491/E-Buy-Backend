const { Product } = require("../../models/product");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getImageById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product || !product.image) {
        return res.status(404).json({ message: "Image not found" });
      }
  
      const imgBuffer = Buffer.from(product.image, "base64");
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": imgBuffer.length,
      });
      res.end(imgBuffer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = { getProduct, getProductById,getImageById };
