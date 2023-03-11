import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Tabs from "../../sharedComponents/tabs";
import { getCourseDetail } from "../../store/actions/courseAction";
import { getScoresByCourse } from "../../store/actions/userAction";

const CourseDetail = (props) => {
  const dispatch = useDispatch();
  const courseDetail = useSelector((state) => state.courseDetail);
  const userScore = useSelector((state) => state.userScore);
  let { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);

  const fetchCourseDetail = () => {
    dispatch(getCourseDetail({ id: id }));
  };

  const fetchUserScore = () => {
    dispatch(getScoresByCourse({ id: id }));
  };

  console.log(userScore);

  useEffect(() => {
    fetchCourseDetail();
    fetchUserScore();
  }, []);

  return (
    <div className="course-detail main-container">
      {courseDetail && (
        <div>
          <h3 className="mb-5">{courseDetail.data.name}</h3>
          <Tabs tabIndex={setCurrentTab} />
          {currentTab === 0 && <div className="course-section"></div>}
          {currentTab === 1 && <div className="student-list-section"></div>}
          {currentTab === 2 && (
            <div className="score-section">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Điểm 1</th>
                    <th scope="col">Điểm 2</th>
                    <th scope="col">Điểm 3</th>
                    <th scope="col">Điểm 4</th>
                    <th scope="col">Điểm 5</th>
                    <th scope="col">Giữa kỳ</th>
                    <th scope="col">Cuối kỳ</th>
                  </tr>
                </thead>
                <tbody>
                  {userScore ? (
                    <tr>
                      <td>{userScore.data.score1 || "--"}</td>
                      <td>{userScore.data.score2 || "--"}</td>
                      <td>{userScore.data.score3 || "--"}</td>
                      <td>{userScore.data.score4 || "--"}</td>
                      <td>{userScore.data.score5 || "--"}</td>
                      <td>{userScore.data.midterm_score || "--"}</td>
                      <td>{userScore.data.final_score || "--"}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={"7"}>Không có dữ liệu</td>
                    </tr>
                  )}
                  <tr>
                    <td colspan="1">
                      <b>Tổng điểm: </b>
                    </td>
                    <td colspan="6">33.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
