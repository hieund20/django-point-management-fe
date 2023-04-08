import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Toast from "../../sharedComponents/toast";
import {
  getForumPostListByCourseID,
  postForumPost,
} from "../../store/actions/forumPostAction";
import moment from "moment";
import "./style.scss";

const ForumPost = (props) => {
  const dispatch = useDispatch();
  let { course_id } = useParams();
  const currentUser = useSelector((state) => state.userDetail);
  const forumPostListByCourseId = useSelector((state) => state.forumPostList);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenCreate, setOpenCreate] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchForumPostListByCourseId = async () => {
    await dispatch(getForumPostListByCourseID({ course_id: course_id }));
  };

  const onSubmit = async (data) => {
    const { title, body } = data;

    let isInvalid = false;
    if (!title || !body) {
      setErrorMessage("Bạn phải nhập đủ thông tin cho các trường");
      isInvalid = true;
    }

    if (!isInvalid) {
      const res = await dispatch(
        postForumPost({
          body: {
            title: title,
            body: body,
            user: currentUser.data.id,
            course: course_id,
          },
        })
      );

      if (res && res.status === 201) {
        setToast(<Toast message={"Tạo bài đăng thành công"} success={true} />);
        setOpenCreate(false);
        fetchForumPostListByCourseId();
      } else {
        setToast(
          <Toast message={"Tạo bài đăng không thành công"} success={false} />
        );
      }
    }
  };

  console.log("forumPostListByCourseId", forumPostListByCourseId);

  useEffect(() => {
    fetchForumPostListByCourseId();
  }, []);

  return (
    <div className="forum main-container">
      <div className="forum-nav d-flex justify-content-between">
        <h3>Diễn đàn trao đổi môn học</h3>
        <button
          className="cursor-pointer btn-submit p-2"
          onClick={() => setOpenCreate(true)}
        >
          Tạo bài đăng
        </button>
      </div>

      {isOpenCreate && (
        <div style={{ margin: "0 auto", width: "70%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 mt-3">
              <label htmlFor="title">
                <b>Tiêu đề</b>
              </label>
              <input
                {...register("title")}
                placeholder="Nhập tiêu đề..."
                id="title"
                style={{ width: "100%" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="body">
                <b>Nội dung</b>
              </label>
              <textarea
                {...register("body")}
                placeholder="Nhập nội dung..."
                id="body"
                style={{ width: "100%" }}
              ></textarea>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="mt-4 mb-4" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}

            <input
              type={"submit"}
              className="cursor-pointer btn-submit p-2"
              value={"Gửi bài đăng"}
            />
          </form>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Thảo luận</th>
            <th scope="col">Người khởi tạo</th>
            <th scope="col">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody>
          {forumPostListByCourseId.data &&
            forumPostListByCourseId.data.results.map((el) => (
              <tr key={el.id}>
                <td>
                  {" "}
                  <Link to={`/forum-post-detail/${el.id}`}>
                    <span>{el.title}</span>
                  </Link>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={el.user.avatar_url} alt="avatar" className="mr-2"/>
                    <span>
                      {el.user.last_name} {el.user.first_name}
                    </span>
                  </div>
                </td>
                <td>{moment(el.created_date).format("DD/MM/YYYY")}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {toast}
    </div>
  );
};

export default ForumPost;
