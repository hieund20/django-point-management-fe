import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Toast from "../../sharedComponents/toast";
import {
  getScoreByUserAndCourse,
  postUserScore,
} from "../../store/actions/scoreAction";

const InputScore = (props) => {
  let { course_id, user_id } = useParams();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const userScore = useSelector((state) => state.scoreByUserAndCourse);
  const [toast, setToast] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [scoreValue, setScoreValue] = useState({});

  const fetchScoreOfUserByCourseAndUser = async () => {
    const res = await dispatch(
      getScoreByUserAndCourse({ user_id: user_id, course_id: course_id })
    );
    if (res && res.status === 200) {
      const { data } = res;
      const newScoreValue = { ...scoreValue };
      for (const [key, value] of Object.entries(data)) {
        if (value !== null) {
          newScoreValue[key] = value;
        } else {
          newScoreValue[key] = "";
        }
      }
      setScoreValue(newScoreValue);
    }
  };

  const onSubmit = async (data) => {
    const { midterm_score, final_score } = data;

    let isInvalid = false;
    if (!midterm_score || !final_score) {
      setErrorMessage("Điểm giữa kỳ và cuối kỳ không được để trống");
      isInvalid = true;
    }

    if (!isInvalid) {
      let objBody = {};
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          objBody[key] = value;
        } else {
          objBody[key] = NaN;
        }
      }

      setErrorMessage("");

      const body = {
        ...objBody,
        is_draft: false,
        user_id: user_id,
        course_id: course_id,
      };

      //Check PUT of POST
      //Todo set default score value for react-hook-form 
      if (userScore.data.hasOwnProperty("id")) {
        console.log("PUT");
      } else {
        console.log("POST");
        const res = await dispatch(postUserScore({ body: body }));
        if (res && res.status === 201) {
          setToast(
            <Toast message={"Lưu điểm sinh viên thành công"} success={true} />
          );
        } else {
          setToast(
            <Toast
              message={`${res.status} - ${res.statusText}`}
              success={false}
            />
          );
        }
      }
    }
  };

  useEffect(() => {
    fetchScoreOfUserByCourseAndUser();
  }, []);

  console.log("userScore", scoreValue);
  console.log("userScore2", userScore);
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
              value={scoreValue.score1}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, score1: e.target.value })
              }
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
              value={scoreValue.score2}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, score2: e.target.value })
              }
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
              value={scoreValue.score3}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, score3: e.target.value })
              }
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
              value={scoreValue.score4}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, score4: e.target.value })
              }
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
              value={scoreValue.score5}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, score5: e.target.value })
              }
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
              value={scoreValue.midterm_score}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, midterm_score: e.target.value })
              }
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
              value={scoreValue.final_score}
              onChange={(e) =>
                setScoreValue({ ...scoreValue, final_score: e.target.value })
              }
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
          value={"Lưu thay đổi"}
        />
      </form>
      {toast}
    </div>
  );
};

export default InputScore;
