import { combineReducers } from "redux";
import AllReducer from './allReducer'
// import GeneologyReducer from './genealogytreeReducer'
import Dashboard from './DashboardView'
export default combineReducers({
    // GeneologyReducer,
    Dashboard,
    AllReducer

})
