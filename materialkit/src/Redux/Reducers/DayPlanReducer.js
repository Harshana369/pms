import { SITE_ID_REQUEST, SITE_ID_SUCCESS, SITE_ID_FAIL } from '../Constants/DayPlanConstants';

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
