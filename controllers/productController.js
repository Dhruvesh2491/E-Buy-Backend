const { Product } = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { displayName, modelName, brandName, description, price, category, subcategory, image } = req.body;
    if (!displayName || !modelName || !brandName || !description || !price || !category || !subcategory || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert Base64 image data to a Buffer
    const imageBuffer = Buffer.from(image.split(",")[1], 'base64');

    const product = new Product({
      displayName,
      modelName,
      brandName,
      description,
      price,
      category,
      subcategory,
      // Convert image buffer to Base64 string
      image: imageBuffer.toString('base64'),
    });

    await product.save();

    // Send the Base64 URL in the response
    const responseData = {
      message: "Product added successfully",
      product: {
        ...product.toObject(),
        // Add Base64 URL for the image
        image: `data:image/jpeg;base64,${product.image}`,
      }
    };

    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



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

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product with new data
    Object.assign(product, updateData);
    
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
    });
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

    // Send the image data in the response
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': product.image.length
    });
    res.end(product.image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const productName = req.query.name;
    const products = await Product.find({
      displayName: { $regex: new RegExp(productName, 'i') }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    // Add other filter conditions as required
    const products = await Product.find(filters);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  editProduct,
  deleteProductById,
  searchProducts,
  filterProducts,
  getImageById
};
