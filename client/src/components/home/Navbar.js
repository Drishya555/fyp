import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from '../../assets/logo.png'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden"; // Disable scroll when menu is open
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} height={59} width={72}/>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className="navlinks">
        <ul className="nav-links">
        <li><NavLink to="/"><a>Home</a></NavLink></li>
        <li><NavLink to="/about"><a>About</a></NavLink></li>
        <li><NavLink to="/services"><a>Services</a></NavLink></li>
        <li><NavLink to="/hospitals"><a>Hospitals</a></NavLink></li>
        <li><NavLink to="/contact"><a>Contact</a></NavLink></li>
        </ul>
        </div>
      {/* Navigation Links */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
       
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
