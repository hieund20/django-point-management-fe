import React from "react";
import "./style.scss";
import { logo } from "../../assets/svg";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="d-flex align-items-center">
        <div className="mr-4">
          <img src={logo} alt="logo" width={120} height={120} />
        </div>
        <div>
          <h3>Hệ thống quản lý điểm sinh viên</h3>
          <p>Created by @hieund and @minh - 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
