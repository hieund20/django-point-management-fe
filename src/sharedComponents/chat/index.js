import React from "react";
import { messageIcon } from "../../assets/svg";
import "./style.scss";

const Chat = (props) => {
  return (
    <div className="chat">
      <div className="chat-icon">
        <img src={messageIcon} alt="message-icon" />
      </div>
    </div>
  );
};

export default Chat;
