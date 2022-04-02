import { useState, useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-area">
      <div className="navbar-title">
        <h1>Elements</h1>
      </div>
      <div className="navbar">
        <nav>
          <div className="navbar-list">
            <div className="navbar-item">
              <Link to="/" className="link">Home</Link>
            </div>
            <div className="navbar-item">
              <Link to="/add" className="link">Add Element</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
