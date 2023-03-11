import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          E-Point Management
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-course">
                <span>Các khóa học của tôi</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <span>Đăng ký</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <span>Đăng nhập</span>
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
