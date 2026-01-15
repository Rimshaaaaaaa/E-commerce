import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AdminOrders.css';

const AdminDashBoard = () => {
  const user = useSelector((state) => state.auth.user);

  const [loadingAI, setLoadingAI] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: '',
    ratings: '',
  });

  // ✅ Admin protection
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 🤖 AI DESCRIPTION GENERATOR
  const generateAIDescription = async () => {
    if (!newProduct.name || !newProduct.category) {
      alert('Please enter product name and category first');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Admin not logged in');
      return;
    }

    try {
      setLoadingAI(true);

      const res = await axios.post(
        'http://localhost:5000/api/ai/generate-description',
        {
          name: newProduct.name,
          category: newProduct.category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewProduct((prev) => ({
        ...prev,
        description: res.data.description,
      }));
    } catch (error) {
      console.error(error);
      alert('AI description generation failed');
    } finally {
      setLoadingAI(false);
    }
  };

  // 🛒 ADD PRODUCT
  const addProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.category
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in as admin');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Product added successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        category: '',
        ratings: '',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <h4 style={styles.subHeading}>Add New Product</h4>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
        style={styles.input}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newProduct.category}
        onChange={handleInputChange}
        style={styles.input}
      />

      <button onClick={generateAIDescription} style={styles.aiButton}>
        {loadingAI ? '✨ Generating...' : '🤖 Generate AI Description'}
      </button>

      <textarea
        name="description"
        placeholder="AI generated description will appear here..."
        value={newProduct.description}
        onChange={handleInputChange}
        style={styles.textarea}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
        style={styles.input}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={handleInputChange}
        style={styles.input}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={handleInputChange}
        style={styles.input}
      />

      <input
        type="number"
        name="ratings"
        placeholder="Ratings"
        value={newProduct.ratings}
        onChange={handleInputChange}
        style={styles.input}
      />

      <button onClick={addProduct} style={styles.button}>
        ➕ Add Product
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    background: 'linear-gradient(135deg, #ffe0f0, #fff)',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#d6336c',
  },
  subHeading: {
    textAlign: 'center',
    color: '#ff77a9',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    height: '140px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#ff77a9',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    marginTop: '15px',
    cursor: 'pointer',
  },
  aiButton: {
    width: '100%',
    padding: '10px',
    background: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    margin: '10px 0',
    cursor: 'pointer',
  },
};

export default AdminDashBoard;
