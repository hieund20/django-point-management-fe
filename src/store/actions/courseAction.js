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
          Authorization: `Bearer DCNKGkP0f0YmaWZbSwNAAX89bZOCVg`,
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
