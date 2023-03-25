import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { accountIcon, editIcon, importFileIcon } from "../../assets/svg";
import Tabs from "../../sharedComponents/tabs";
import Toast from "../../sharedComponents/toast";
import {
  getCourseDetail,
  getCourseMembers,
} from "../../store/actions/courseAction";
import {
  getScoreCSV,
  getScorePDF,
  postImportScoreCSV,
} from "../../store/actions/scoreAction";
import {
  getScoresByCourse,
  getUserListByName,
} from "../../store/actions/userAction";
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
  //Toast
  const [toast, setToast] = useState(null);
  //File
  const [file, setFile] = useState(null);

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

  const importScoreCSV = async () => {
    const res = await dispatch(
      postImportScoreCSV({
        body: {
          file: file,
        },
        course_id: id,
      })
    );
    if (res && res.status === 200) {
      setToast(
        <Toast message={"Import điểm sinh viên thành công"} success={true} />
      );
    } else {
      setToast(
        <Toast
          message={"Import điểm sinh viên không thành công"}
          success={false}
        />
      );
    }
  };

  const onExportScoreToCSV = async () => {
    const res = await dispatch(getScoreCSV({ course_id: id }));

    if (res && res.status === 200) {
      const { data } = res;

      //Create csv file
      const blob = new Blob([data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "score.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      setToast(
        <Toast
          message={"Xuất điểm sinh viên ra CSV không thành công"}
          success={false}
        />
      );
    }
  };

  const onExportScoreToPDF = async () => {
    const res = await dispatch(getScorePDF({ course_id: id }));

    if (res && res.status === 200) {
      const { data } = res;

      //Create csv file
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      setToast(
        <Toast
          message={"Xuất điểm sinh viên ra PDF không thành công"}
          success={false}
        />
      );
    }
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
              <Link to={`/forum/${id}`}>Diễn đàn môn học</Link>
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
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    className="btn-green"
                    onClick={() => importScoreCSV()}
                  >
                    Import bảng điểm
                  </button>
                </div>

                <div style={{ marginRight: 0, marginLeft: 8 }}>
                  <button
                    onClick={() => onExportScoreToCSV()}
                    className="btn-green"
                  >
                    Xuất điểm CSV
                  </button>
                  <button
                    className="btn-green"
                    style={{ marginLeft: 8 }}
                    onClick={() => onExportScoreToPDF()}
                  >
                    Xuất điểm PDF
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
      {toast}
    </div>
  );
};

export default CourseDetail;
