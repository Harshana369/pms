import {
  SITE_ID_REQUEST,
  SITE_ID_SUCCESS,
  SITE_ID_FAIL,
  ALL_TABLE_REQUEST,
  ALL_TABLE_FAIL,
  ALL_TABLE_SUCCESS,
  UNIQUE_TABLE_sUCCESS
} from '../Constants/DayPlanConstants';

export const SiteIdReducer = (state = { SiteIdData: [] }, action) => {
  switch (action.type) {
    case SITE_ID_REQUEST:
      return { loading: true, SiteIdData: [] };
    case SITE_ID_SUCCESS:
      return { loading: false, SiteIdData: action.payload };
    case SITE_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AllTableReducer = (state = { AllTableData: [] }, action) => {
  switch (action.type) {
    case ALL_TABLE_REQUEST:
      return { allTableLoading: true, AllTableData: [] };
    case ALL_TABLE_SUCCESS:
      return { allTableLoading: false, AllTableData: action.payload };
    case UNIQUE_TABLE_sUCCESS:
      return { allTableLoading: false, AllTableData: action.payload };
    case ALL_TABLE_FAIL:
      return { allTableLoading: false, AllTableError: action.payload };
    default:
      return state;
  }
};
