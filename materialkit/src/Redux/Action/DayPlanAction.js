import axios from 'axios';
import {
  SITE_ID_REQUEST,
  SITE_ID_SUCCESS,
  SITE_ID_FAIL,
  ALL_TABLE_REQUEST,
  ALL_TABLE_SUCCESS,
  ALL_TABLE_FAIL,
  UNIQUE_TABLE_sUCCESS
} from '../Constants/DayPlanConstants';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const AllSiteId = () => async (dispatch) => {
  try {
    dispatch({ type: SITE_ID_REQUEST });
    const { data } = await axiosInstance.get('/getAllSiteEngineersName');
    dispatch({ type: SITE_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SITE_ID_FAIL,

      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getSiteEngineerForTableData = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TABLE_REQUEST });
    const { data } = await axiosInstance.get('/getSiteEngineerForTable');

    dispatch({ type: ALL_TABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_TABLE_FAIL,

      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getUniqueSiteEngineerForTableLoad = (siteEName) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TABLE_REQUEST });
    const { data } = await axiosInstance.get(
      `/getSiteEngineerForTableLoad/${siteEName.Site_Engineer}`
    );
    dispatch({ type: UNIQUE_TABLE_sUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_TABLE_FAIL,

      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
