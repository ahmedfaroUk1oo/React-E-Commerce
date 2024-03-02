import React, { useContext, useState } from 'react';
import styles from './NavBar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.svg';
import { tokenContext } from '../../Context/Token';
import { carContext } from './../../Context/CartContext';

export default function NavBar() {
  let {token ,setToken} = useContext(tokenContext);
  const {countItem} =useContext(carContext);
 
   const navigate = useNavigate();
  function logOut() {
    setToken(null);
    localStorage.removeItem("userToken");
    navigate("./login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"home"}>
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 py-2">
           
            {token ? (<>       
              <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to={"home"}>
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"products"}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"categories"}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={"brands"}>
                    Brands
                  </NavLink>
                </li>       
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={"wishlist"}>
                    WishList <i className="fa-solid fa-hand-holding-heart"></i>
                  </NavLink>
                </li>       
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={"allorders"}>
                    My Orders
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" aria-current="page" to={"cart"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-75 translate-middle badge bg-black">
                      {countItem}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </NavLink>
                </li>
                </>
            ) : (
              ""
            )}
              </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center">
                <i className="fa-brands mx-1 fa-facebook"></i>
                <i className="fa-brands mx-1 fa-instagram"></i>
                <i className="fa-brands mx-1 fa-linkedin"></i>
                <i className="fa-brands mx-1 fa-google"></i>
              </li>

              {token ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={logOut}>
                    LogOut
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to={"register"}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to={"login"}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
