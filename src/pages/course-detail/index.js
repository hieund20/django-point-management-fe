import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { accountIcon, editIcon, importFileIcon } from "../../assets/svg";
import Pagination from "../../sharedComponents/pagination";
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
  getUserListById,
  getUserListByName,
} from "../../store/actions/userAction";
import "./style.scss";
import Chat from "../../sharedComponents/chat";

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
    user_id: "",
  });
  //Toast
  const [toast, setToast] = useState(null);
  //File
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(
    `https://django-point-management.herokuapp.com/course/${id}/get_member/`
  );

  const fetchCourseDetail = () => {
    dispatch(getCourseDetail({ id: id }));
  };

  const fetchUserScore = () => {
    dispatch(getScoresByCourse({ id: id }));
  };

  const fetchCourseMember = () => {
    dispatch(getCourseMembers({ url: url }));
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

  const fetchCourseMemberByID = () => {
    const { user_id } = searchValue;
    dispatch(
      getUserListById({
        course_id: id,
        user_id: user_id,
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
  }, []);

  useEffect(() => {
    fetchCourseMember();
  }, [url]);

  useEffect(() => {
    fetchCourseMemberByName();
    fetchCourseMemberByID();
  }, [searchValue]);

  return (
    <>
      <div className="course-detail main-container">
        {courseDetail.data && (
          <div>
            <h3 className="mb-5">{courseDetail.data.name}</h3>
            <Tabs tabIndex={setCurrentTab} isShowScoreTab={!data.is_staff} />

            {currentTab === 0 && (
              <div className="course-section">
                <Link to={`/forum-post/${id}`}>Diễn đàn môn học</Link>
                <p
                  className="mt-3"
                  dangerouslySetInnerHTML={{
                    __html: courseDetail.data.content,
                  }}
                ></p>
              </div>
            )}

            {currentTab === 1 && (
              <div className="student-list-section">
                <div className="d-flex mb-5 mt-5">
                  <div style={{ marginRight: 0, marginLeft: "auto" }}></div>
                  {data.is_staff && (
                    <>
                      <div className="mr-0 ml-0">
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => setFile(e.target.files[0])}
                          id="upload-file"
                        />
                        <label for="upload-file" className="mr-2 ml-5">
                          Chọn file CSV
                        </label>
                        <button
                          className="btn-green"
                          onClick={() => importScoreCSV()}
                        >
                          Import bảng điểm
                        </button>
                      </div>

                      <div className="mr-0 ml-2">
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
                    </>
                  )}
                </div>

                <div className="row mb-4">
                  <input
                    className="col-2 form-control mr-3"
                    placeholder="Mã số sinh viên..."
                    value={searchValue.user_id}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        user_id: e.target.value,
                      })
                    }
                  />
                  <input
                    className="col-3 form-control mr-3"
                    placeholder="Họ sinh viên..."
                    value={searchValue.last_name}
                    onChange={(e) =>
                      setSearchValue({
                        ...searchValue,
                        last_name: e.target.value,
                      })
                    }
                  />
                  <input
                    className="col-3 form-control"
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

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Mã số sinh viên</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Email</th>
                      <th scope="col">Vai trò</th>
                      {data.is_staff && <th scope="col"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {courseMembers.data.results &&
                      courseMembers.data.results.map((el, index) => (
                        <tr className="align-items-center" key={el.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{el.id || "--"}</td>
                          <td>{`${el.last_name || "--"} ${
                            el.first_name || "--"
                          }`}</td>
                          <td>{el.email || "--"}</td>
                          <td>{el.is_staff ? "Giảng viên" : "Sinh viên"}</td>
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

                {/* Pagination */}
                <div className="mt-3">
                  {courseMembers.data && (
                    <Pagination
                      data={courseMembers.data}
                      setNextUrl={setUrl}
                      setPreviousUrl={setUrl}
                    />
                  )}
                </div>
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
      <Chat courseId={id} />
    </>
  );
};

export default CourseDetail;
