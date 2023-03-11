import React from "react";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="login main-container">
      <h3 className="text-center mb-5">Đăng nhập</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "40%", margin: "0 auto" }}
      >
        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="username"><b>Tên đăng nhập</b></label>
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
            <label htmlFor="password"><b>Mật khẩu</b></label>
          </div>
          <div className="col-8">
            <input {...register("password")} style={{ width: "100%" }} />
          </div>
        </div>
        <input className="cursor-pointer" style={{width: "100%", height: 50}} type="submit" value={"Đăng nhập"} id="password" />
      </form>
    </div>
  );
};

export default Login;
