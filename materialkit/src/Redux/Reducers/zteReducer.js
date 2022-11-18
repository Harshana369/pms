import {
  ZTE_FILTERED_NAMES_REQUEST,
  ZTE_FILTERED_NAMES_SUCCESS,
  ZTE_FILTERED_NAMES_FAIL,
  ZTE_COLUMN_CHART_DATA_SUCCESS,
  ZTE_COLUMN_CHART_DATA_FAIL,
  ZTE_AREA_CHART_DATA_SUCCESS,
  ZTE_AREA_CHART_DATA_FAIL,
  ZTE_AREA_CHART_DATA_REQUEST,
  ZTE_DATABASE_REQUEST,
  ZTE_DATABASE_SUCCESS,
  ZTE_DATABASE_FAIL,
  ZTE_SCOPE_DATA_SUCCESS,
  ZTE_SCOPE_DATA_FAIL,
  ZTE_LAST_UPDATE_SUCCESS,
  ZTE_LAST_UPDATE_FAIL,
  ZTE_COLUMN_CHART_DATA_REQUEST,
  ZTE_SCOPE_DATA_REQUEST,
  ZTE_LAST_UPDATE_REQUEST
} from '../Constants/zteconstants';

export const zteDatabaseReducer = (state = { zteDatabaseData: [] }, action) => {
  switch (action.type) {
    case ZTE_DATABASE_REQUEST:
      return { zteDatabaseLoading: true, zteDatabaseData: [] };
    case ZTE_DATABASE_SUCCESS:
      return { zteDatabaseLoading: false, zteDatabaseData: action.payload };
    case ZTE_DATABASE_FAIL:
      return { zteDatabaseLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const zteFiltedNameReducer = (state = { zteFiltedNameData: [] }, action) => {
  switch (action.type) {
    case ZTE_FILTERED_NAMES_REQUEST:
      return { zteFiltedNameLoading: true, zteFiltedNameData: [] };
    case ZTE_FILTERED_NAMES_SUCCESS:
      return { zteFiltedNameLoading: false, zteFiltedNameData: action.payload };
    case ZTE_FILTERED_NAMES_FAIL:
      return { zteFiltedNameLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const zteColumChartReducer = (state = { zteColumChartData: [] }, action) => {
  switch (action.type) {
    case ZTE_COLUMN_CHART_DATA_REQUEST:
      return { zteColumChartLoading: true, zteColumChartData: [] };
    case ZTE_COLUMN_CHART_DATA_SUCCESS:
      return { zteColumChartLoading: false, zteColumChartData: action.payload };
    case ZTE_COLUMN_CHART_DATA_FAIL:
      return { zteColumChartLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const zteAreaChartReducer = (state = { zteAreaChartData: [] }, action) => {
  switch (action.type) {
    case ZTE_AREA_CHART_DATA_REQUEST:
      return { zteAreaChartLoading: true, zteAreaChartData: [] };
    case ZTE_AREA_CHART_DATA_SUCCESS:
      return { zteAreaChartLoading: false, zteAreaChartData: action.payload };
    case ZTE_AREA_CHART_DATA_FAIL:
      return { zteAreaChartLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const zteScopeReducer = (state = { zteScopeData: [] }, action) => {
  switch (action.type) {
    case ZTE_SCOPE_DATA_REQUEST:
      return { zteScopeLoading: true, zteScopeData: [] };
    case ZTE_SCOPE_DATA_SUCCESS:
      return { zteScopeLoading: false, zteScopeData: action.payload };
    case ZTE_SCOPE_DATA_FAIL:
      return { zteScopeLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const zteLastUpdateReducer = (state = { zteLastUpdateData: [] }, action) => {
  switch (action.type) {
    case ZTE_LAST_UPDATE_REQUEST:
      return { zteLastUpdateLoading: true, zteLastUpdateData: [] };
    case ZTE_LAST_UPDATE_SUCCESS:
      return { zteLastUpdateLoading: false, zteLastUpdateData: action.payload };
    case ZTE_LAST_UPDATE_FAIL:
      return { zteLastUpdateLoading: false, error: action.payload };
    default:
      return state;
  }
};
