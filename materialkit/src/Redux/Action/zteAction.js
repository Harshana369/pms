import axios from 'axios';
import {
  ZTE_AREA_CHART_DATA_FAIL,
  ZTE_AREA_CHART_DATA_REQUEST,
  ZTE_AREA_CHART_DATA_SUCCESS,
  ZTE_COLUMN_CHART_DATA_FAIL,
  ZTE_COLUMN_CHART_DATA_REQUEST,
  ZTE_COLUMN_CHART_DATA_SUCCESS,
  ZTE_DATABASE_FAIL,
  ZTE_DATABASE_REQUEST,
  ZTE_DATABASE_SUCCESS,
  ZTE_FILTERED_NAMES_FAIL,
  ZTE_FILTERED_NAMES_REQUEST,
  ZTE_FILTERED_NAMES_SUCCESS,
  ZTE_LAST_UPDATE_FAIL,
  ZTE_LAST_UPDATE_REQUEST,
  ZTE_LAST_UPDATE_SUCCESS,
  ZTE_SCOPE_DATA_FAIL,
  ZTE_SCOPE_DATA_REQUEST,
  ZTE_SCOPE_DATA_SUCCESS
} from '../Constants/zteconstants';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchZTEData = (VendorZTEDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: ZTE_DATABASE_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabases', {
      params: { Project: VendorZTEDropdownValue }
    });

    dispatch({ type: ZTE_DATABASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_DATABASE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchZTEProjectNames = () => async (dispatch) => {
  try {
    dispatch({ type: ZTE_FILTERED_NAMES_REQUEST });
    const { data } = await axiosInstance.get('/filteredVendorProjectsNamesArray', {
      params: { Vendor: 'ZTE' }
    });

    dispatch({ type: ZTE_FILTERED_NAMES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_FILTERED_NAMES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchZTEColumnGraphData = (VendorZTEDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: ZTE_COLUMN_CHART_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabasesChartDataColumnChartData', {
      params: { Project: VendorZTEDropdownValue }
    });

    dispatch({ type: ZTE_COLUMN_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_COLUMN_CHART_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchZTEAreaGraphData = (VendorZTEDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: ZTE_AREA_CHART_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsDatabasesChartDataAreaChartData', {
      params: { Project: VendorZTEDropdownValue }
    });

    dispatch({ type: ZTE_AREA_CHART_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_AREA_CHART_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchZTEScopeData = (VendorZTEDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: ZTE_SCOPE_DATA_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsOverviewTable', {
      params: { ProjectName: VendorZTEDropdownValue }
    });

    dispatch({ type: ZTE_SCOPE_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_SCOPE_DATA_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchZTEProjectsLastUpdates = (VendorZTEDropdownValue) => async (dispatch) => {
  try {
    dispatch({ type: ZTE_LAST_UPDATE_REQUEST });
    const { data } = await axiosInstance.get('/vendorProjectsLastUpdates', {
      params: { Project: VendorZTEDropdownValue }
    });

    dispatch({ type: ZTE_LAST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ZTE_LAST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
