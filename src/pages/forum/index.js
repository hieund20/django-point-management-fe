import React from "react";
import "./style.scss";

const Forum = (props) => {
  const questionList = [
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
  ];

  return (
    <div className="forum main-container">
      <div className="forum-header">
        <span className="left">Diễn đàn trao đổi môn học</span>
        <span className="right">Tạo bài đăng</span>
      </div>
      {questionList.map((el) => (
        <div className="forum-body">
          <span className="left">{el.title}</span>
          <span className="right">{el.user}</span>
        </div>
      ))}
    </div>
  );
  //mock data, show 5 câu hỏi
};

export default Forum;
