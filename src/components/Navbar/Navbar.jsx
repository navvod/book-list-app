import React from 'react';
import './Navbar.css'; // Add your styles here or use inline styles
import logo from '../../Images/logo.png'; 



const Navbar = () => {
  return (
    
    <nav className="navbar">
        
      <div className="navbar-left">
        <img
          src={logo}// Replace with your logo path
          alt="Shop Logo"
          className="navbar-logo"
        />
        <span className="navbar-shop-name">BOOKSDAILY</span>
      </div>
    </nav>
  );
};

export default Navbar;