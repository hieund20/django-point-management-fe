import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList } from "../../store/actions/courseAction";

const MyCourses = (props) => {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.courseList);

  const fetchCourseList = () => {
    dispatch(getCourseList());
  };

  useEffect(() => {
    fetchCourseList();
  }, []);

  // const courseList = [
  //   {
  //     id: "",
  //     name: "Lập trình hiện đại",
  //   },
  //   {
  //     id: "",
  //     name: "Lập trình Java",
  //   },
  //   {
  //     id: "",
  //     name: "Lập trình CSDL",
  //   },
  // ];

  console.log("courseList", courseList);

  return (
    <div className="my-courses">
      <h3>Các khóa học của tôi</h3>
      <div className="d-flex align-items-center justify-content-between main-container">
        {courseList.data.results &&
          courseList.data.results.map((el) => (
            <div
              className=""
              key={el.id}
              style={{
                border: "1px solid blue",
                width: "30%",
                borderRadius: 4,
                padding: 8,
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="source-thumb"
                height="80"
                style={{ marginBottom: 8, width: "100%" }}
              />
              <div>
                <span>
                  <b>{el.name}</b>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyCourses;
