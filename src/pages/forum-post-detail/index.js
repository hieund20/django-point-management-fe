import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Toast from "../../sharedComponents/toast";
import {
  getForumPostDetail,
  postForumPost,
} from "../../store/actions/forumPostAction";
import {
  getForumPostAnswerListByForumPostID,
  postForumAnswerPost,
} from "../../store/actions/forumPostAnswerAction";
import "./style.scss";

const ForumPostDetail = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  const forumPostDetail = useSelector((state) => state.forumPostDetail);
  const forumPostAnswerList = useSelector((state) => state.forumPostAnswerList);
  const currentUser = useSelector((state) => state.userDetail);
  const { data } = forumPostDetail;
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenFormCreate, setOpenFormCreate] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchForumPostById = async () => {
    await dispatch(getForumPostDetail({ id: id }));
  };

  const fetchForumAnswerByForumPostId = async () => {
    await dispatch(getForumPostAnswerListByForumPostID({ forum_post_id: id }));
  };

  const onSubmit = async (data) => {
    const { body } = data;

    let isInvalid = false;
    if (!body) {
      setErrorMessage("Bạn phải nhập đủ thông tin cho các trường");
      isInvalid = true;
    }

    if (!isInvalid) {
      const res = await dispatch(
        postForumAnswerPost({
          body: {
            body: body,
            user: currentUser.data.id,
            forum_post: id,
          },
        })
      );

      if (res && res.status === 201) {
        setToast(<Toast message={"Tạo phúc đáp thành công"} success={true} />);
        setOpenFormCreate(false);
        fetchForumAnswerByForumPostId();
      } else {
        setToast(
          <Toast message={"Tạo bài đăng không thành công"} success={false} />
        );
      }
    }
  };

  useEffect(() => {
    fetchForumPostById();
    fetchForumAnswerByForumPostId();
  }, []);

  console.log("forumPostAnswerList", forumPostAnswerList);

  return (
    <div className="forum-post-detail main-container">
      {data && (
        <>
          <div className="forum-post-question">
            <div className="d-flex justify-content-between">
              <h4>{data.title}</h4>
              <span>{data.created_date}</span>
            </div>
            <p>{data.body}</p>

            <div className="forum-post-question-action">
              <span
                className="cursor-pointer answer"
                onClick={() => setOpenFormCreate(true)}
              >
                Phúc đáp
              </span>
              <span className="cursor-pointer like">Thích</span>
            </div>
          </div>

          {isOpenFormCreate && (
            <div
              style={{ marginLeft: "auto", marginRight: 0, width: "70%" }}
              className="mt-4"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  value={"Gửi phúc đáp"}
                />
              </form>
            </div>
          )}

          {forumPostAnswerList.data &&
            forumPostAnswerList.data.map((el, index) => (
              <div className="forum-post-answer mt-4">
                <span>{el.created_date}</span>
                <p className="mt-3">{el.body}</p>
              </div>
            ))}
        </>
      )}
      {toast}
    </div>
  );
};

export default ForumPostDetail;
