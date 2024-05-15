import React from 'react';
import { NavLink } from 'react-router-dom';
import metabot from "../assets/HomePagePics/logos/F-removebg-preview.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div style={{ backgroundColor: 'black' }} className="container-fluid">
        <div className="d-flex justify-content-center align-items-center">
          {/* Centered image and brand name */}
          <NavLink className="navbar-brand" to="/">
            <img width={'200px'} height={'133px'} src={metabot} alt="" />
          </NavLink>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i class="fa-solid fa-sliders"></i></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink style={{ fontSize: '1rem' }} className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink style={{ fontSize: '1rem' }} className="nav-link" to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink style={{ fontSize: '1rem' }} className="nav-link" to="/service">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink style={{ fontSize: '1rem' }} className="nav-link" to="/contact">Contact Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink style={{ fontSize: '1rem' }} className="nav-link" to="/upload-pdf">Training Form</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
