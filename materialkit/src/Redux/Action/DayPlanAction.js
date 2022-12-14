import axios from "axios";
import {
  SITE_ID_REQUEST,
  SITE_ID_SUCCESS,
  SITE_ID_FAIL,
} from "../Constants/DayPlanConstants";

export const AllSiteId = () => async (dispatch) => {
  try {
    dispatch({ type: SITE_ID_REQUEST });
    const { data } = await axios.get("/allSiteID");
    console.log("----------");
    console.log(data);
    console.log("----------");
    dispatch({ type: SITE_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SITE_ID_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
