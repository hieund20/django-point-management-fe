import React, { useState } from "react";
import { closeIcon, messageIcon } from "../../assets/svg";
import "./style.scss";

const Chat = (props) => {
  const [isExpandChat, setExpandChat] = useState(false);

  return (
    <div className="chat">
      {!isExpandChat ? (
        <div className="chat-icon" onClick={() => setExpandChat(true)}>
          <img src={messageIcon} alt="message-icon" />
        </div>
      ) : (
        <div className="chat-expand">
          <div className="chat-expand-header d-flex align-items-center justify-content-between">
            <div></div>
            <img
              width={25}
              height={25}
              src={closeIcon}
              alt="close-icon"
              className="cursor-pointer"
              onClick={() => setExpandChat(false)}
            />
          </div>
          <div className="chat-expand-body"></div>
          <div className="chat-expand-footer"></div>
        </div>
      )}
    </div>
  );
};

export default Chat;
