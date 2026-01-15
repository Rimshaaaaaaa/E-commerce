// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
      <div className="col-sm-9 navpart2 d-flex align-items-center">
        <ul className="list list-inline ml-auto">
          <li className="list-inline-item"><Link to="/">Home</Link></li>

          {!isAuthenticated && <li className="list-inline-item"><Link to="/login">Login</Link></li>}
          {!isAuthenticated && <li className="list-inline-item"><Link to="/register">Register</Link></li>}

          {isAuthenticated && (
            <>
              <li className="list-inline-item">
                <button onClick={handleLogout} className="btn btn-link p-0 m-0" style={{ textDecoration: 'none' }}>
                  Logout
                </button>
              </li>
              <li className="list-inline-item"><Link to="/profile">Profile</Link></li>
              
              <li className="list-inline-item"><Link to="/cart">🛒 Cart</Link></li>
              <li className="list-inline-item"><Link to="/checkout">Checkout</Link></li>

              {/* Show admin links only if user is admin */}
              {user?.isAdmin && (
                <>
                  <li className="list-inline-item"><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                  <li className="list-inline-item"><Link to="/admin/orders">Admin Orders</Link></li>
                </>
              )}
            </>
          )}

          <li className="list-inline-item"><Link to="/products">Products</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
