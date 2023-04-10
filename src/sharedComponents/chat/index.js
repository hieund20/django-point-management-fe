import React, { useEffect, useState } from "react";
import { defaultAvatar, sendMessageImg } from "../../assets/image";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { closeIcon, messageIcon } from "../../assets/svg";
import "./style.scss";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const { courseId } = props;
  const currentUser = useSelector((state) => state.userDetail);
  const { data } = currentUser;
  const [isExpandChat, setExpandChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    await addDoc(collection(db, "messages"), {
      userId: data.id,
      text: message,
      name: `${data.last_name} ${data.first_name}`,
      createdAt: serverTimestamp(),
      roomId: 1,
      courseId: courseId,
      avatarUrl: data.avatar_url,
    });
    setMessage("");
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages.filter((el) => el.courseId === courseId));
    });
    return () => unsubscribe;
  }, []);

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
          <div className="chat-expand-body">
            {messages?.map((message, index) =>
              data.id === message.userId ? (
                <div className="message right" key={message.id}>
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="content">{message.text}</div>
                    <img
                      width={30}
                      height={30}
                      src={message.avatarUrl || defaultAvatar}
                      alt="user-avatar"
                      className="ml-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={message.name}
                    />
                  </div>
                </div>
              ) : (
                <div className="message left" key={message.id}>
                  <div className="d-flex align-items-center">
                    <img
                      width={30}
                      height={30}
                      src={message.avatarUrl || defaultAvatar}
                      alt="user-avatar"
                      className="mr-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={message.name}
                    />
                    <div className="content">{message.text}</div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="chat-expand-footer d-flex align-items-center justify-content-between">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              class="form-control"
              style={{width: "80%"}}
            />
            <img
              className="cursor-pointer"
              src={sendMessageImg}
              alt="send-message"
              onClick={() => sendMessage()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
