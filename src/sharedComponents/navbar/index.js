import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../assets/image";
import { logoutUser } from "../../store/actions/userAction";
import { logo } from "../../assets/svg";
import "./style.scss";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userDetail);
  const { data } = currentUser;

  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} alt="logo" width={50} height={50}/>
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
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              {data && (
                <Link className="nav-link" to="/my-course">
                  <span>Các khóa học của tôi</span>
                </Link>
              )}
            </li>
            {!data && (
              <>
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
              </>
            )}
            {data && (
              <li
                className="nav-item dropdown"
                style={{ float: "right", marginLeft: "auto" }}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={data.avatar_url ? data.avatar_url : defaultAvatar}
                    alt="avatar"
                    width={20}
                    height={20}
                    style={{ marginRight: 8, borderRadius: "50%" }}
                  />
                  {data.email}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => logout()}
                  >
                    Đăng xuất
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
