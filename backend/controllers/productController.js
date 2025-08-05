import Product from '../models/Product.js';

// Create Product (Admin Only)
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({ title, description, price, image });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Product by ID (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Product by ID (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Products (Public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Product by id 
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Get Product By ID Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
