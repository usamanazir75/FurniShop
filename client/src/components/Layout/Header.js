import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const categories = useCategory();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
  };

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open state
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <button
            className={`navbar-toggler ${isMenuOpen ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={handleToggle} // Toggle button click
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarTogglerDemo01">
            <Link
              to="/"
              className="navbar-brand text-white"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "1.75rem" }}
            >
              <span className="brand-name">Furni</span>
              <span className="brand-highlight">Shop</span>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ fontFamily: "Poppins, sans-serif" }}>
              <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white hover-underline">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
                 Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                  <Link className="dropdown-item" to={"/categories"}>All Categories</Link>
                  </li>
                 {categories?.map((c) => (
                <li key={c._id}>
                <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                </li>
                ))}
                </ul>
              </li>


            
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white hover-underline">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white hover-underline">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>

                      <NavLink onClick={handleLogout} to="/login" className="nav-link text-white hover-underline">
                        Logout
                      </NavLink>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge className="mt-2" count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link text-white hover-underline">
                  Cart
                </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
