import axios from 'axios';
import {
  HUAWEI_AREA_CHART_DATA_FAIL,
  HUAWEI_AREA_CHART_DATA_REQUEST,
  HUAWEI_AREA_CHART_DATA_SUCCESS,
  HUAWEI_COLUMN_CHART_DATA_FAIL,
  HUAWEI_COLUMN_CHART_DATA_REQUEST,
  HUAWEI_COLUMN_CHART_DATA_SUCCESS,
  HUAWEI_DATABASE_FAIL,
  HUAWEI_DATABASE_REQUEST,
  HUAWEI_DATABASE_SUCCESS,
  HUAWEI_FILTERED_NAMES_FAIL,
  HUAWEI_FILTERED_NAMES_REQUEST,
  HUAWEI_FILTERED_NAMES_SUCCESS,
  HUAWEI_LAST_UPDATE_FAIL,
  HUAWEI_LAST_UPDATE_REQUEST,
  HUAWEI_LAST_UPDATE_SUCCESS,
  HUAWEI_SCOPE_DATA_FAIL,
  HUAWEI_SCOPE_DATA_REQUEST,
  HUAWEI_SCOPE_DATA_SUCCESS
} from '../Constants/haweiConstants';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchHuaweiData = (VendorHuaweiDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_DATABASE_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabases', {
      params: { Project: VendorHuaweiDropdownValue }
    });

    dispatch({ type: HUAWEI_DATABASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_DATABASE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchHuaweiProjectNames = () => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_FILTERED_NAMES_REQUEST });
    const { data } = await axiosInstance.get('/filteredVendorProjectsNamesArray', {
      params: { Vendor: 'Huawei' }
    });

    dispatch({ type: HUAWEI_FILTERED_NAMES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_FILTERED_NAMES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchHuaweiColumnGraphData = (VendorHuaweiDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_COLUMN_CHART_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabasesChartDataColumnChartData', {
      params: { Project: VendorHuaweiDropdownValue }
    });

    dispatch({ type: HUAWEI_COLUMN_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_COLUMN_CHART_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchHuaweiAreaGraphData = (VendorHuaweiDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_AREA_CHART_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabasesChartDataAreaChartData', {
      params: { Project: VendorHuaweiDropdownValue }
    });

    dispatch({ type: HUAWEI_AREA_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_AREA_CHART_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchHuaweiScopeData = (VendorHuaweiDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_SCOPE_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsOverviewTable', {
      params: { Project: VendorHuaweiDropdownValue }
    });

    dispatch({ type: HUAWEI_SCOPE_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_SCOPE_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchHuaweiProjectsLastUpdates = (VendorHuaweiDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: HUAWEI_LAST_UPDATE_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsLastUpdates', {
      params: { Project: VendorHuaweiDropdownValue }
    });

    dispatch({ type: HUAWEI_LAST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HUAWEI_LAST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
