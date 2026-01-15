import React, { useState } from 'react';
import axios from 'axios';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [wishlistAdded, setWishlistAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to add items to the cart');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/${user.id}`, {
        productId: product._id,
        quantity: 1,
      });
      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Failed to add item to cart');
    }
  };

  const addToWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to save products to your wishlist.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/add/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistAdded(true);
    } catch (error) {
      console.error('Add to wishlist failed:', error);
      alert('Failed to save item to wishlist');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
          <button
            className={`save-wishlist ${wishlistAdded ? 'added' : ''}`}
            onClick={() => addToWishlist(product._id)}
          >
            {wishlistAdded ? '❤️ Saved' : '🤍 Save for Later'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
