import {
  SITE_ID_REQUEST,
  SITE_ID_SUCCESS,
  SITE_ID_FAIL,
  ALL_TABLE_REQUEST,
  ALL_TABLE_FAIL,
  ALL_TABLE_SUCCESS,
  UNIQUE_TABLE_sUCCESS,
  UNIQUE_TABLE_FAIL,
  UNIQUE_TABLE_REQUEST,
  SITE_ENGINEER_FOR_SITE_SUCCESS,
  SITE_ENGINEER_FOR_SITE_FAIL,
  SITE_ENGINEER_FOR_SITE_REQUEST
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
    case UNIQUE_TABLE_REQUEST:
      return { uniqueTableLoading: true, AllTableData: [] };
    case UNIQUE_TABLE_sUCCESS:
      return { uniqueTableLoading: false, AllTableData: action.payload };
    case UNIQUE_TABLE_FAIL:
      return { uniqueTableLoading: false, uniqueTableError: action.payload };
    case ALL_TABLE_FAIL:
      return { allTableLoading: false, AllTableError: action.payload };
    default:
      return state;
  }
};

export const SiteEngineerForSite = (state = { SiteEngineerForSites: [] }, action) => {
  switch (action.type) {
    case SITE_ENGINEER_FOR_SITE_REQUEST:
      return { SiteEngineerForSitesLoading: true, SiteEngineerForSites: [] };
    case SITE_ENGINEER_FOR_SITE_SUCCESS:
      return { SiteEngineerForSitesLoading: false, SiteEngineerForSites: action.payload };
    case SITE_ENGINEER_FOR_SITE_FAIL:
      return { SiteEngineerForSitesLoading: false, SiteEngineerForSitesError: action.payload };
    default:
      return state;
  }
};
