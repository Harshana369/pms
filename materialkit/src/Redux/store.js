import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  mobitelChartAreaReducer,
  mobitelChartColumnReducer,
  mobitelDatabseReducer,
  mobitelLastUpdateReducer,
  mobitelOverviewReducer,
  mobitelScopeReducer
} from './Reducers/mobitelReduce';
import {
  huaweiAreaChartReducer,
  huaweiColumChartReducer,
  huaweiDatabaseReducer,
  huaweiFiltedNameReducer,
  huaweiLastUpdateReducer,
  huaweiScopeReducer
} from './Reducers/huaweiReducer';
import {
  zteAreaChartReducer,
  zteColumChartReducer,
  zteDatabaseReducer,
  zteFiltedNameReducer,
  zteLastUpdateReducer,
  zteScopeReducer
} from './Reducers/zteReducer';

const reducer = combineReducers({
  mobitelDatabse: mobitelDatabseReducer,
  mobitelOverview: mobitelOverviewReducer,
  mobitelChartColumn: mobitelChartColumnReducer,
  mobitelChartArea: mobitelChartAreaReducer,
  mobitelScope: mobitelScopeReducer,
  mobitelLastUpdate: mobitelLastUpdateReducer,
  //---------------------
  huaweiDatabase: huaweiDatabaseReducer,
  huaweiFiltedName: huaweiFiltedNameReducer,
  huaweiColumChart: huaweiColumChartReducer,
  huaweiAreaChart: huaweiAreaChartReducer,
  huaweiScope: huaweiScopeReducer,
  huaweiLastUpdate: huaweiLastUpdateReducer,
  //---------------------
  zteDatabase: zteDatabaseReducer,
  zteFiltedName: zteFiltedNameReducer,
  zteColumChart: zteColumChartReducer,
  zteAreaChart: zteAreaChartReducer,
  zteScope: zteScopeReducer,
  zteLastUpdate: zteLastUpdateReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
