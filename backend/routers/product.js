const express = require('express'); 
const { getProducts, getProductById , createProduct } = require('../controllers/productController'); 
const { protect , adminOnly} = require('../middleware/authMiddleware');
 const router = express.Router(); 
 router.get('/', getProducts);
  router.get('/:id', getProductById); 
  router.post('/', protect,adminOnly, createProduct); 
  module.exports = router;