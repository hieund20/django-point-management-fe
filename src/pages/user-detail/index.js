import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { defaultAvatar } from "../../assets/image";
import { getScoreByUserAndCourse } from "../../store/actions/scoreAction";
import { getUserDetailById } from "../../store/actions/userAction";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetailById);
  const userScore = useSelector((state) => state.scoreByUserAndCourse);
  const { data } = userDetail;
  let { id } = useParams();

  const fetchUserDetailById = () => {
    dispatch(getUserDetailById({ id: id }));
  };

  const fetchScoreOfUserByCourseAndUser = () => {
    dispatch(getScoreByUserAndCourse({ user_id: id, course_id: 2 }));
  };

  useEffect(() => {
    fetchUserDetailById();
    fetchScoreOfUserByCourseAndUser();
  }, []);

  return (
    <div className="user-detail main-container">
      <div style={{ width: "40%" }}>
        <h3 className="mb-5">Thông tin sinh viên</h3>

        {data ? (
          <>
            <div className="row mb-3">
              <div className="col">
                <img
                  src={data.avatar_url ? data.avatar_url : defaultAvatar}
                  alt="avatar"
                  width={50}
                  height={50}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <b>Họ và tên: </b>
              </div>
              <div className="col">
                <span>{`${data.last_name} ${data.first_name}`}</span>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <b>Email: </b>
              </div>
              <div className="col">
                <span>{data.email || "--"}</span>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <b>Vai trò: </b>
              </div>
              <div className="col">
                {data.is_superuser ? (
                  <span>Giáo vụ</span>
                ) : (
                  <span>{data.is_staff ? "Giảng viên" : "Sinh viên"}</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>
            {" "}
            <b>Chưa có dữ liệu</b>
          </div>
        )}
      </div>
      {!data.is_staff && (
        <div style={{ width: "80%" }}>
          <h3 className="mt-5 mb-5">Điểm sinh viên</h3>
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
              {userScore.data ? (
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
                  <td colSpan={7}>Không có thông tin về điểm</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
