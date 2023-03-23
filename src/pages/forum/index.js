import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Forum = (props) => {
  const questionList = [
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
  ];

  return (
    <div className="forum main-container">
      <div className="forum-nav">
        <span>Diễn đàn trao đổi môn học</span>
        <button className="right"><Link to={"/forum-create"}>Tạo bài đăng</Link></button>
      </div>
      <br></br>
      {questionList.map((el) => (
        <div className="forum-content">
          <ul>
            <li>
              <span >{el.title}</span> <br></br>
              <span >{el.user}</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
  //mock data, show 5 câu hỏi
};

export default Forum;
