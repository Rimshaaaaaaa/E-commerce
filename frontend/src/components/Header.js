import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/image/logo.jpg';
import Search from '../assets/image/search.jpg';
import { Dropdown } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <header className="headerWrapper">

      {/* Top Strip */}
      <div className="top-strip">
        <div className="container text-center">
          <p className="mb-0 mt-0">
            💖 Due to <b>TRAFFIC</b>, orders may proceed with slight delay
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main sticky-top">
        <div className="container d-flex align-items-center justify-content-between">

          {/* Logo + Brand Name */}
          <Link to="/" className="d-flex align-items-center logo-section">
            <img src={Logo} alt="Logo" className="logo-image" />
            <div className="logo-text ms-3">
              <h1 className="brand-name">GlowBeauty</h1>
              <p className="tagline">Luxury Makeup & Skincare</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="search-bar d-flex align-items-center">
            <input
              type="text"
              placeholder="Search makeup products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>
              <img src={Search} alt="Search" />
            </button>
          </div>

          {/* User + Cart */}
          <div className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-dropdown">
                <FiUser size={20} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/order-history">Order History</Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <button className="cart-btn ms-3" onClick={() => navigate('/cart')}>
              <IoCartOutline size={22} />
              {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
