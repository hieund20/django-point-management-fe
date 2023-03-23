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
        <h3>
          <span className="mb-5">Diễn đàn trao đổi môn học</span>
          <button className="right mb-5">
            <Link style={{ color: "white" }} to={"/forum-create"}>
              Tạo bài đăng
            </Link>
          </button>
        </h3>
      </div>
      <br></br>
      {questionList.map((el) => (
        <div className="forum-content">
          <ul>
            <li class="px-2 py-3 border-top">
              <span><Link to={"/forum-post"}>{el.title}</Link></span>
              <span>{el.user}</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
  //mock data, show 4 câu hỏi
};

export default Forum;
