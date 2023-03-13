import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Tabs from "../../sharedComponents/tabs";
import {
  getCourseDetail,
  getCourseMembers,
} from "../../store/actions/courseAction";
import { getScoresByCourse } from "../../store/actions/userAction";
import { editIcon } from "../../assets/svg";
import { Link } from "react-router-dom";

const CourseDetail = (props) => {
  const dispatch = useDispatch();
  const courseDetail = useSelector((state) => state.courseDetail);
  const userScore = useSelector((state) => state.userScore);
  const courseMembers = useSelector((state) => state.courseMembers);
  const currentUser = useSelector((state) => state.userDetail);
  const { data } = currentUser;
  let { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);

  const fetchCourseDetail = () => {
    dispatch(getCourseDetail({ id: id }));
  };

  const fetchUserScore = () => {
    dispatch(getScoresByCourse({ id: id }));
  };

  const fetchCourseMember = () => {
    dispatch(getCourseMembers({ id: id }));
  };

  useEffect(() => {
    fetchCourseDetail();
    fetchUserScore();
    fetchCourseMember();
  }, []);

  console.log(courseMembers);

  return (
    <div className="course-detail main-container">
      {courseDetail && (
        <div>
          <h3 className="mb-5">{courseDetail.data.name}</h3>
          <Tabs tabIndex={setCurrentTab} />
          {currentTab === 0 && <div className="course-section"></div>}

          {currentTab === 1 && (
            <div className="student-list-section">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Lớp sinh viên</th>
                    {data.is_staff && <th scope="col"></th>}
                  </tr>
                </thead>
                <tbody>
                  {courseMembers &&
                    courseMembers.data.map((el, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{`${el.last_name || "--"} ${
                          el.first_name || "--"
                        }`}</td>
                        <td>{el.email || "--"}</td>
                        <td>{el.is_staff ? "Giảng viên" : "Sinh viên"}</td>
                        <td>{el.className || "--"}</td>
                        {data.is_staff && (
                          <td className="d-flex align-items-center">
                            <Link
                              className="cursor-pointer"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Nhập điểm sinh viên"
                              to={`/my-course/input-scores/${id}/user/${el.id}`}
                            >
                              <img
                                src={editIcon}
                                alt="edit-icon"
                                width={18}
                                height={18}
                              />
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

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
