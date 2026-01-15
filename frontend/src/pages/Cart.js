import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        setCartItems(response.data.products || []);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const grandTotal = calculateSubtotal() + shipping;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {loading ? (
        <p className="loading-text">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 🟢 Cart Summary Section */}
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
