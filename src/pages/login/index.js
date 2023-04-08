import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE } from "../../config/constants";
import Toast from "../../sharedComponents/toast";
import {
  getUserDetail,
  getUserDetailByEmail,
  loginUser,
} from "../../store/actions/userAction";
//Firebase
import { auth } from "../../firebase";
import firebase from "../../firebase";
import "./style.scss";
import { facebookLoginIcon, googleLoginIcon } from "../../assets/svg";

const Login = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  //Handle Login with Google Account
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleSignInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    auth
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { _delegate } = user;
        const { email } = _delegate;
        // TODO: handle the signed in user
        fetchUserLoginByEmail(email);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log("errorCode", errorCode);
        // The email of the user's account used.
        const email = error.email;
        console.log("email", email);
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log("credential", credential);
        // TODO: handle errors
        const errorMessage = error.message;
        setToast(<Toast message={errorMessage} success={false} />);
      });
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  const fetchUserLoginByEmail = async (email) => {
    const res = await dispatch(getUserDetailByEmail({ email: email }));
    if (!Object.keys(res.data).length) {
      setToast(
        <Toast
          message={"Không tồn tại người dùng trong hệ thống"}
          success={false}
        />
      );
      handleSignOut();
    } else {
      const {data} = res;
      setValue("username", data.username);
      setToast(
        <Toast
          message={
            "Tồn tại người dùng trong hệ thống, nhập mật khẩu để đăng nhập"
          }
          success={true}
        />
      );
    }
  };

  //Handle login with normal method
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { _delegate } = user;
        const { email } = _delegate;
        fetchUserLoginByEmail(email);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="login main-container">
      <h3 className="text-center mb-5">Đăng nhập</h3>
      <div style={{ width: "70%", margin: "0 auto" }}>
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

        <div className="d-flex justify-content-between">
          <button
            className="mt-3 cursor-pointer btn-submit btn-google-login"
            onClick={handleSignInWithGoogle}
          >
            Đăng nhập với Google
            <img
              src={googleLoginIcon}
              alt="google-login"
              width={25}
              height={25}
              className="ml-2"
            />
          </button>

          <button
            className="mt-3 cursor-pointer btn-submit btn-google-login"
            onClick={handleSignInWithFacebook}
          >
            Đăng nhập với Facebook
            <img
              src={facebookLoginIcon}
              alt="google-login"
              width={25}
              height={25}
              className="ml-2"
            />
          </button>
        </div>

        {/* <button onClick={handleSignOut}>Logout</button> */}
      </div>
      {toast}
    </div>
  );
};

export default Login;
