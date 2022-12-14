import axios from 'axios';
import { SITE_ID_REQUEST, SITE_ID_SUCCESS, SITE_ID_FAIL } from '../Constants/DayPlanConstants';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const AllSiteId = () => async (dispatch) => {
  try {
    dispatch({ type: SITE_ID_REQUEST });
    const { data } = await axiosInstance.get('/getAllSiteEngineersName');
    console.log(data);
    dispatch({ type: SITE_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SITE_ID_FAIL,

      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
