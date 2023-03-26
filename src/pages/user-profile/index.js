import React from "react";
import "./style.scss";

const UserProfile = (props) => {
  return (
    <div className="user-profile main-container">
      <h3 className="mb-5">Hồ sơ</h3>
      <img src="" alt="avatar-user" />
      <input type={"file"} />
    </div>
  );
};

export default UserProfile;
