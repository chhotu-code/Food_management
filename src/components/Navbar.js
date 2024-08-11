import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Model from "../Model";
import Cart from "../screen/Cart";
import { useCard } from "./ContextReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const data = useCard();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const toggleCartView = () => {
    setCartView(!cartView);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid m-1 ">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Apna Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-4"
                    aria-current="page"
                    to="/"
                  >
                    My Order
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {!localStorage.getItem("authToken") ? (
            <div className="navbar-nav d-flex gap-2">
              <Link className="btn bg-white text-success rounded" to="/Signup">
                SignUp
              </Link>
              <Link className="btn bg-white text-success rounded" to="/Login">
                Login
              </Link>
            </div>
          ) : (
            <div>
              <div className="navbar-nav d-flex">
                <Link
                  className="btn bg-white text-success rounded mx-2"
                  to="#"
                  onClick={toggleCartView}
                >
                  My Cart{" "}
                  <Badge pill bg="danger" className="gap-2">{data.length}</Badge>
                </Link>
                {cartView && (
                  <Model onClose={() => setCartView(false)}>
                    <Cart />
                  </Model>
                )}
                <Link
                  className="btn bg-white text-success rounded mx-2"
                  to="#"
                  onClick={handleLogout}
                >
                  LogOut
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
