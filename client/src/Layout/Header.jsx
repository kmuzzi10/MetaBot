import React from 'react';
import { NavLink } from 'react-router-dom';
import metabot from "../assets/HomePagePics/logos/F-removebg-preview.png";

const Header = () => {
    return (
        <nav  className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div style={{backgroundColor:'black'}} className="container-fluid">
                <NavLink className="navbar-brand" to='/'>
                    <img width={'150px'} height={'100px'} src={metabot} alt='' />
                    
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i class="fa-solid fa-sliders"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul  className="navbar-nav">
                        <li className="nav-item">
                            <NavLink style={{fontSize:'1rem'}} className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{fontSize:'1rem'}} className="nav-link" to='/about'>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{fontSize:'1rem'}} className="nav-link" to='/service'>Service</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{fontSize:'1rem'}} className="nav-link" to='/contact'>Contact</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink style={{fontSize:'1rem'}} className="nav-link" to='/upload-pdf'>Training Form</NavLink>
                        </li> */}
                    
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
