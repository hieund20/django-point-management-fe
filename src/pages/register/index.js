import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { OU_EDU_EMAIL_REGEX } from "../../config/constants";
import Toast from "../../sharedComponents/toast";
import { registerUser } from "../../store/actions/userAction";

const Register = (props) => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    const {
      last_name,
      first_name,
      className,
      email,
      username,
      password,
      confirm_password,
    } = data;

    let isInvalid = false;
    if (
      !last_name ||
      !first_name ||
      !email ||
      !username ||
      !password ||
      !confirm_password
    ) {
      setErrorMessage("Bạn phải nhập đủ thông tin cho các trường bắt buộc");
      isInvalid = true;
    } else {
      //Check email is valid
      if (!OU_EDU_EMAIL_REGEX.test(email)) {
        setErrorMessage("Địa chỉ email không đúng định dạng của trường cấp");
        isInvalid = true;
      }
      //Check password and confirm password is same
      if (password !== confirm_password) {
        setErrorMessage("Mật khẩu và Xác nhận mật khẩu phải trùng nhau");
        isInvalid = true;
      }
    }

    if (!isInvalid) {
      const body = {
        last_name: last_name,
        first_name: first_name,
        className: className,
        email: email,
        username: username,
        password: password,
      };
      if (!className) delete body.className;

      const res = await dispatch(registerUser({ body: body }));
      if (res && res.status === 201) {
        setToast(
          <Toast
            message={
              "Đăng ký tài khoản sinh viên thành công. Chuyển hướng đăng nhập..."
            }
            success={true}
          />
        );
        setTimeout(() => {
          navigate("/login");
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
    <div className="register main-container">
      <h3 className="text-center mb-5">Đăng ký</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "50%", margin: "0 auto" }}
      >
        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="last_name">
              <b>
                Họ và tên đệm <span className="red-dot">*</span>
              </b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("last_name")}
              id="last_name"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="first_name">
              <b>
                Tên <span className="red-dot">*</span>
              </b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("first_name")}
              id="first_name"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="className">
              <b>Lớp</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("className")}
              id="className"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="email">
              <b>
                Email (do trường cấp) <span className="red-dot">*</span>
              </b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("email")}
              id="email"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="username">
              <b>
                Tên đăng nhập <span className="red-dot">*</span>
              </b>
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
              <b>
                Mật khẩu <span className="red-dot">*</span>
              </b>
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

        <div className="row mb-3">
          <div className="col-4 text-left">
            <label htmlFor="confirm_password">
              <b>
                Xác nhận mật khẩu <span className="red-dot">*</span>
              </b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("confirm_password")}
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
          className="cursor-pointer"
          style={{ width: "100%", height: 50 }}
          type="submit"
          value={"Đăng ký"}
          id="password"
        />
      </form>
      {toast}
    </div>
  );
};

export default Register;
