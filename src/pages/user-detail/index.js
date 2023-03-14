import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { defaultAvatar } from "../../assets/image";
import { getUserDetailById } from "../../store/actions/userAction";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetailById);
  const { data } = userDetail;
  let { id } = useParams();

  const fetchUserDetailById = () => {
    dispatch(getUserDetailById({ id: id }));
  };

  useEffect(() => {
    fetchUserDetailById();
  }, []);

  return (
    <div className="user-detail main-container">
      <div style={{ width: "30%" }}>
        <h3 className="mb-5">Thông tin người dùng</h3>
        <div className="row mb-3">
          <div className="col">
            <img src={defaultAvatar} alt="avatar" width={50} height={50} />
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
              <tr>
                <td>7</td>
                <td>7</td>
                <td>7</td>
                <td>7</td>
                <td>7</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
