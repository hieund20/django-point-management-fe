import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../sharedComponents/pagination";
import { getCourseList } from "../../store/actions/courseAction";
import "./style.scss";

const MyCourses = (props) => {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.courseList);
  const { data } = courseList;
  const [url, setUrl] = useState(
    "https://django-point-management.herokuapp.com/course/"
  );

  const fetchCourseList = () => {
    dispatch(getCourseList({ url: url }));
  };

  useEffect(() => {
    fetchCourseList();
  }, [url]);

  return (
    <div className="my-courses main-container">
      <h3 className="mb-5">Các khóa học của tôi</h3>
      <div className="my-courses-container d-flex align-items-center">
        {data.results &&
          data.results.map((el) => (
            <Link
              to={`/my-course/${el.id}`}
              key={el.id}
              style={{
                border: "1px solid lightgrey",
                width: "30%",
                borderRadius: 4,
                padding: 8,
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              className="cursor-pointer mb-5"
            >
              <div>
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
            </Link>
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <Pagination data={data} setNextUrl={setUrl} setPreviousUrl={setUrl} />
      </div>
    </div>
  );
};

export default MyCourses;
