import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.scss";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
              <input {...register("password")} style={{ width: "100%" }} />
            </div>
          </div>
          <input
            className="cursor-pointer"
            style={{ width: "100%", height: 50 }}
            type="submit"
            value={"Đăng nhập"}
            id="password"
          />
        </form>
        <p className="mt-3">
          Đã có tài khoản <Link to={"/register"}>Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
