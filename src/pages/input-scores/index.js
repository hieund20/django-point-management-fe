import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Toast from "../../sharedComponents/toast";
import { postUserScore } from "../../store/actions/scoreAction";

const InputScore = (props) => {
  let { course_id, user_id } = useParams();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    const body = {
      ...data,
      user_id: user_id,
      course_id: course_id,
    };

    const res = await dispatch(postUserScore({ body: body }));
    if (res && res.status === 201) {
      setToast(
        <Toast message={"Lưu điểm sinh viên thành công"} success={true} />
      );
    } else {
      setToast(
        <Toast message={`${res.status} - ${res.statusText}`} success={false} />
      );
    }
  };

  return (
    <div className="input-score main-container">
      <h3 className="mb-5">Nhập điểm sinh viên</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "60%" }}>
        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="score1">
              <b>Điểm 1</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("score1")}
              id="score1"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-left">
            <label htmlFor="score2">
              <b>Điểm 2</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("score2")}
              id="score2"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="score3">
              <b>Điểm 3</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("score3")}
              id="score3"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="score3">
              <b>Điểm 4</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("score4")}
              id="score4"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="score5">
              <b>Điểm 5</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("score5")}
              id="score5"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="midterm_score">
              <b>Điểm giữa kỳ</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("midterm_score")}
              id="midterm_score"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-between mb-3">
          <div className="col-4 text-left">
            <label htmlFor="final_score">
              <b>Điểm cuối kỳ</b>
            </label>
          </div>
          <div className="col-8">
            <input
              {...register("final_score")}
              id="final_score"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <input
          className="cursor-pointer"
          style={{ width: "100%", height: 50 }}
          type="submit"
          value={"Lưu thay đổi"}
        />
      </form>
      {toast}
    </div>
  );
};

export default InputScore;
