const Product = require('../models/Product');

// GET /api/products?search=...&sort=price-asc&category=electronics
const getProducts = async (req, res) => {
  try {
    const { search, sort, category } = req.query;

    let filter = {};

    // Category filter
    if (category) filter.category = category;

    // Search by product name (case-insensitive)
    if (search) filter.name = { $regex: search, $options: "i" };

    // Base query
    let query = Product.find(filter);

    // Sorting directly in MongoDB
    if (sort === 'price-asc') query = query.sort({ price: 1 });
    else if (sort === 'price-desc') query = query.sort({ price: -1 });

    const products = await query;

    // Always return array, even if empty
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// POST /api/products (Admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, category, ratings } = req.body;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
      ratings: ratings || 0,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
