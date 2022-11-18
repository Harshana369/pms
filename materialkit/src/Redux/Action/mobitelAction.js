import axios from 'axios';

import {
  MOBITEL_CHART_AREA_DATA_FAIL,
  MOBITEL_CHART_AREA_DATA_REQUEST,
  MOBITEL_CHART_AREA_DATA_SUCCESS,
  MOBITEL_CHART_COLUMN_DATA_FAIL,
  MOBITEL_CHART_COLUMN_DATA_REQUEST,
  MOBITEL_CHART_COLUMN_DATA_SUCCESS,
  MOBITEL_DATABASE_FAIL,
  MOBITEL_DATABASE_REQUEST,
  MOBITEL_DATABASE_SUCCESS,
  MOBITEL_LAST_UPDATE_FAIL,
  MOBITEL_LAST_UPDATE_REQUEST,
  MOBITEL_LAST_UPDATE_SUCCESS,
  MOBITEL_OVERVIEW_FAIL,
  MOBITEL_OVERVIEW_REQUEST,
  MOBITEL_OVERVIEW_SUCCESS,
  MOBITEL_SCOPE_DATA_FAIL,
  MOBITEL_SCOPE_DATA_REQUEST,
  MOBITEL_SCOPE_DATA_SUCCESS
} from '../Constants/mobitelConstants';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchMobitelData = (MobitelDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_DATABASE_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsDatabases', {
      params: { Project: MobitelDropdownValue }
    });

    dispatch({ type: MOBITEL_DATABASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_DATABASE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchMobitelProjectNames = () => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_OVERVIEW_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsOverviewTable/ProjectsArray');
    dispatch({ type: MOBITEL_OVERVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_OVERVIEW_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchMobitelColumnGraphData = (MobitelDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_CHART_COLUMN_DATA_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsDatabasesChartDataColumnChartData', {
      params: { Project: MobitelDropdownValue }
    });
    dispatch({ type: MOBITEL_CHART_COLUMN_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_CHART_COLUMN_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchMobitelAreaGraphData = (MobitelDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_CHART_AREA_DATA_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsDatabasesChartDataAreaChartData', {
      params: { Project: MobitelDropdownValue }
    });
    dispatch({ type: MOBITEL_CHART_AREA_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_CHART_AREA_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchMobitelScopeData = (MobitelDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_SCOPE_DATA_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsOverviewTable', {
      params: { ProjectName: MobitelDropdownValue }
    });

    dispatch({ type: MOBITEL_SCOPE_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_SCOPE_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchMobitelLastUpdatesData = (MobitelDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: MOBITEL_LAST_UPDATE_REQUEST });
    const { data } = await axiosInstance.get('/mobitelProjectsLastUpdates', {
      params: { Project: MobitelDropdownValue }
    });
    dispatch({ type: MOBITEL_LAST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOBITEL_LAST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
