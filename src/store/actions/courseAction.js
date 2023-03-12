import axios from "axios";

export const getCourseList = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_LIST_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/`,
      {
        headers: {
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_LIST_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_LIST_FAIL",
    });
  }
};

export const getCourseDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_DETAIL_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/${payload.id}/`,
      {
        headers: {
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_DETAIL_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_DETAIL_FAIL",
    });
  }
};

export const getCourseMembers = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_MEMBER_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/${payload.id}/get_member/`,
      {
        headers: {
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_MEMBER_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_MEMBER_FAIL",
    });
  }
};

// export const GetPokemon = (pokemon) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "POKEMON_MULTIPLE_LOADING",
//     });

//     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

//     dispatch({
//       type: "POKEMON_MULTIPLE_SUCCESS",
//       payload: res.data,
//       pokemonName: pokemon,
//     });
//   } catch (e) {
//     dispatch({
//       type: "POKEMON_MULTIPLE_FAIL",
//     });
//   }
// };
