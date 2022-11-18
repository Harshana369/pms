import {
  HUAWEI_FILTERED_NAMES_REQUEST,
  HUAWEI_FILTERED_NAMES_SUCCESS,
  HUAWEI_FILTERED_NAMES_FAIL,
  HUAWEI_COLUMN_CHART_DATA_REQUEST,
  HUAWEI_COLUMN_CHART_DATA_SUCCESS,
  HUAWEI_COLUMN_CHART_DATA_FAIL,
  HUAWEI_AREA_CHART_DATA_FAIL,
  HUAWEI_DATABASE_SUCCESS,
  HUAWEI_DATABASE_FAIL,
  HUAWEI_SCOPE_DATA_SUCCESS,
  HUAWEI_SCOPE_DATA_FAIL,
  HUAWEI_LAST_UPDATE_SUCCESS,
  HUAWEI_LAST_UPDATE_FAIL,
  HUAWEI_AREA_CHART_DATA_REQUEST,
  HUAWEI_AREA_CHART_DATA_SUCCESS,
  HUAWEI_DATABASE_REQUEST,
  HUAWEI_SCOPE_DATA_REQUEST,
  HUAWEI_LAST_UPDATE_REQUEST
} from '../Constants/haweiConstants';

export const huaweiDatabaseReducer = (state = { huaweiDatabaseData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_DATABASE_REQUEST:
      return { huaweiDatabaseLoading: true, huaweiDatabaseData: [] };
    case HUAWEI_DATABASE_SUCCESS:
      return { huaweiDatabaseLoading: false, huaweiDatabaseData: action.payload };
    case HUAWEI_DATABASE_FAIL:
      return { huaweiDatabaseLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const huaweiFiltedNameReducer = (state = { huaweiFiltedNameData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_FILTERED_NAMES_REQUEST:
      return { huaweiFiltedNameLoading: true, huaweiFiltedNameData: [] };
    case HUAWEI_FILTERED_NAMES_SUCCESS:
      return { huaweiFiltedNameLoading: false, huaweiFiltedNameData: action.payload };
    case HUAWEI_FILTERED_NAMES_FAIL:
      return { huaweiFiltedNameLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const huaweiColumChartReducer = (state = { huaweiColumChartData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_COLUMN_CHART_DATA_REQUEST:
      return { huaweiColumChartLoading: true, huaweiColumChartData: [] };
    case HUAWEI_COLUMN_CHART_DATA_SUCCESS:
      return { huaweiColumChartLoading: false, huaweiColumChartData: action.payload };
    case HUAWEI_COLUMN_CHART_DATA_FAIL:
      return { huaweiColumChartLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const huaweiAreaChartReducer = (state = { huaweiAreaChartData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_AREA_CHART_DATA_REQUEST:
      return { huaweiAreaChartLoading: true, huaweiAreaChartData: [] };
    case HUAWEI_AREA_CHART_DATA_SUCCESS:
      return { huaweiAreaChartLoading: false, huaweiAreaChartData: action.payload };
    case HUAWEI_AREA_CHART_DATA_FAIL:
      return { huaweiAreaChartLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const huaweiScopeReducer = (state = { huaweiScopeData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_SCOPE_DATA_REQUEST:
      return { huaweiScopeLoading: true, huaweiScopeData: [] };
    case HUAWEI_SCOPE_DATA_SUCCESS:
      return { huaweiScopeLoading: false, huaweiScopeData: action.payload };
    case HUAWEI_SCOPE_DATA_FAIL:
      return { huaweiScopeLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const huaweiLastUpdateReducer = (state = { huaweiLastUpdateData: [] }, action) => {
  switch (action.type) {
    case HUAWEI_LAST_UPDATE_REQUEST:
      return { huaweiLastUpdateLoading: true, huaweiLastUpdateData: [] };
    case HUAWEI_LAST_UPDATE_SUCCESS:
      return { huaweiLastUpdateLoading: false, huaweiLastUpdateData: action.payload };
    case HUAWEI_LAST_UPDATE_FAIL:
      return { huaweiLastUpdateLoading: false, error: action.payload };
    default:
      return state;
  }
};
