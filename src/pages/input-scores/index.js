import React from "react";
import { useParams } from "react-router";

const InputScore = (props) => {
  let { course_id, user_id } = useParams();

  console.log(course_id, user_id);

  return (
    <div className="input-score main-container">
      <h3 className="mb-5">Nhập điểm sinh viên</h3>
    </div>
  );
};

export default InputScore;
