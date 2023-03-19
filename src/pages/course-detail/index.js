import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Tabs from "../../sharedComponents/tabs";
import {
  getCourseDetail,
  getCourseMembers,
} from "../../store/actions/courseAction";
import {
  getScoresByCourse,
  getUserListByName,
} from "../../store/actions/userAction";
import { editIcon, accountIcon, importFileIcon } from "../../assets/svg";
import { Link } from "react-router-dom";
import "./style.scss";

const CourseDetail = (props) => {
  const dispatch = useDispatch();
  const courseDetail = useSelector((state) => state.courseDetail);
  const userScore = useSelector((state) => state.userScore);
  const courseMembers = useSelector((state) => state.courseMembers);
  const currentUser = useSelector((state) => state.userDetail);
  const { data } = currentUser;
  let { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  //Search
  const [searchValue, setSearchValue] = useState({
    first_name: "",
    last_name: "",
  });

  const fetchCourseDetail = () => {
    dispatch(getCourseDetail({ id: id }));
  };

  const fetchUserScore = () => {
    dispatch(getScoresByCourse({ id: id }));
  };

  const fetchCourseMember = () => {
    dispatch(getCourseMembers({ id: id }));
  };

  const fetchCourseMemberByName = () => {
    const { first_name, last_name } = searchValue;
    dispatch(
      getUserListByName({
        course_id: id,
        first_name: first_name,
        last_name: last_name,
      })
    );
  };

  useEffect(() => {
    fetchCourseDetail();
    fetchUserScore();
    fetchCourseMember();
  }, []);

  useEffect(() => {
    fetchCourseMemberByName();
  }, [searchValue]);

  return (
    <div className="course-detail main-container">
      {courseDetail && (
        <div>
          <h3 className="mb-5">{courseDetail.data.name}</h3>
          <Tabs tabIndex={setCurrentTab} isShowScoreTab={!data.is_staff} />
          
          {currentTab === 0 && (
            <div className="course-section">
              <h4>
                <Link to={"/forum"}>Diễn đàn môn học</Link>
              </h4>
            </div>
          )}

          {currentTab === 1 && (
            <div className="student-list-section">
              <div className="d-flex mb-3">
                <div
                  className="d-flex"
                  style={{ marginRight: 0, marginLeft: "auto" }}
                >
                  <input
                    style={{ marginRight: 12 }}
                    placeholder="Họ sinh viên..."
                    value={searchValue.last_name}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        last_name: e.target.value,
                      })
                    }
                  />
                  <div>
                    <b>-</b>
                  </div>
                  <input
                    style={{ marginLeft: 12 }}
                    placeholder="Tên sinh viên..."
                    value={searchValue.first_name}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mr-3 ml-3">
                  <span>|</span>
                </div>

                <div style={{ marginRight: 0, marginLeft: 0 }}>
                  <button>
                    <img
                      src={importFileIcon}
                      alt="import-file-icon"
                      width={20}
                      height={20}
                    />{" "}
                    Nhập điểm sinh viên
                  </button>
                </div>
              </div>

              <table className="table">
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
                      <tr className="align-items-center" key={el.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{`${el.last_name || "--"} ${
                          el.first_name || "--"
                        }`}</td>
                        <td>{el.email || "--"}</td>
                        <td>{el.is_staff ? "Giảng viên" : "Sinh viên"}</td>
                        <td>{el.className || "--"}</td>
                        {data.is_staff && (
                          <td>
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
                                width={15}
                                height={15}
                                style={{ marginLeft: 8 }}
                              />
                            </Link>

                            <Link
                              className="cursor-pointer"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Xem thông tin sinh viên"
                              to={`/user-detail/${el.id}`}
                              style={{ marginLeft: 4 }}
                            >
                              <img
                                src={accountIcon}
                                alt="edit-icon"
                                width={15}
                                height={15}
                                style={{ marginLeft: 8 }}
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
              <table className="table">
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
