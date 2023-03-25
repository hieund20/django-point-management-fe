import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } from "../../config/constants";
import Toast from "../../sharedComponents/toast";
import { getUserDetail, loginUser } from "../../store/actions/userAction";
import "./style.scss";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    const { username, password } = data;

    let isInvalid = false;
    if (!username || !password) {
      setErrorMessage("Bạn phải nhập đủ thông tin cho các trường");
      isInvalid = true;
    }

    if (!isInvalid) {
      const res = await dispatch(
        loginUser({
          body: {
            grant_type: GRANT_TYPE,
            username: username,
            password: password,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
        })
      );

      if (res && res.status === 200) {
        setToast(<Toast message={"Đăng nhập thành công"} success={true} />);
        //Set LocalStorage
        localStorage.setItem("OAUTH2", JSON.stringify(res.data));
        const { access_token, token_type } = res.data;
        const currentUser = await dispatch(
          getUserDetail({ access_token: access_token, token_type: token_type })
        );
        localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser.data));
        //Redirect to home page
        setTimeout(() => {
          navigate("/my-course");
        }, 3000);
      } else {
        setToast(
          <Toast
            message={`${res.status} - ${res.statusText}`}
            success={false}
          />
        );
      }
      setErrorMessage("");
    }
  };

  return (
    <div className="login main-container">
      <h3 className="text-center mb-5">Đăng nhập</h3>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-between mb-3">
            <div className="col-4 text-left">
              <label htmlFor="username">
                <b>Tên đăng nhập</b>
              </label>
            </div>
            <div className="col-8">
              <input
                {...register("username")}
                id="username"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4 text-left">
              <label htmlFor="password">
                <b>Mật khẩu</b>
              </label>
            </div>
            <div className="col-8">
              <input
                {...register("password")}
                style={{ width: "100%" }}
                type="password"
              />
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="mt-4 mb-4" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

          <input
            className="cursor-pointer btn-submit"
            style={{ width: "100%", height: 50 }}
            type="submit"
            value={"Đăng nhập"}
          />
        </form>
        <p className="mt-3">
          Chưa có tài khoản <Link to={"/register"}>Đăng ký</Link>
        </p>
      </div>
      {toast}
    </div>
  );
};

export default Login;
