
import axios from 'axios';

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';

export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});


export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});
export const fetchCities = () => {
  return async (dispatch) => {
    dispatch(fetchCitiesRequest()); 
    try {
      const response = await axios.get('http://localhost:8080/api/cities/all');
      dispatch(fetchCitiesSuccess(response.data.response)); 
    } catch (error) {
      dispatch(fetchCitiesFailure(error.message)); 
    }
  };
};
