import React from "react";

const Forum = (props) => {
  const questionList = [
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
    { title: "Thắc mắc điểm", user: "Nguyễn Văn A" },
  ];

  return (
    <div className="forum main-container">
      <h3>Diễn đàn trao đổi môn học</h3>
      {questionList.map((el) => (
        <div>
          <h4>{el.title}</h4>
          <p>{el.user}</p>
        </div>
      ))}
    </div>
  );
  //mock data, show 5 câu hỏi
};

export default Forum;
