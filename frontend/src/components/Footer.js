import React from 'react';
import { GiLipstick, GiDelicatePerfume } from "react-icons/gi";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">

        {/* Top Info */}
        <div className="topInfo row text-center">
          <div className='col info-card'>
            <GiLipstick size={30} />
            <p>Every type of Lip products</p>
          </div>
          <div className='col info-card'>
            <GiDelicatePerfume size={30} />
            <p>Every type of Perfumes</p>
          </div>
          <div className='col info-card'>
            <CiDiscount1 size={30} />
            <p>Discount codes available</p>
          </div>
          <div className='col info-card'>
            <CiDeliveryTruck size={30} />
            <p>Free delivery on all products</p>
          </div>
        </div>

        {/* Links Section */}
        <div className='row mt-5 linksWrap'>
          <div className='col'>
            <h5>Lip Products</h5>
            <ul>
              <li><Link to="#">Nude Lipstick</Link></li>
              <li><Link to="#">Matte Lipstick</Link></li>
              <li><Link to="#">Waterproof Lipstick</Link></li>
              <li><Link to="#">Glossy Lipstick</Link></li>
            </ul>
          </div>

          <div className='col'>
            <h5>Perfumes</h5>
            <ul>
              <li><Link to="#">Woody Notes</Link></li>
              <li><Link to="#">Oudh</Link></li>
              <li><Link to="#">Floral Notes</Link></li>
              <li><Link to="#">Citrus Notes</Link></li>
            </ul>
          </div>

          <div className='col'>
            <h5>Eye Shadows</h5>
            <ul>
              <li><Link to="#">Nude Shades</Link></li>
              <li><Link to="#">Glitter Shades</Link></li>
              <li><Link to="#">Smokey Shades</Link></li>
              <li><Link to="#">Matte & Shimmers</Link></li>
            </ul>
          </div>

          <div className='col'>
            <h5>Face Products</h5>
            <ul>
              <li><Link to="#">Oily Skin</Link></li>
              <li><Link to="#">Acne Prone</Link></li>
              <li><Link to="#">Dry Skin</Link></li>
              <li><Link to="#">Textured Skin</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="row mt-5 newsletter-social text-center">
          <div className="col-md-6 mb-3">
            <h5>Subscribe to our Newsletter</h5>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <Link to="#"><FaFacebookF /></Link>
              <Link to="#"><FaInstagram /></Link>
              <Link to="#"><FaTwitter /></Link>
              <Link to="#"><FaPinterestP /></Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4">
          <div className="col text-center">
            <p>© 2026 Makeup Store. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
