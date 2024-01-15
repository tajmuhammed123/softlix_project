import { combineReducers } from 'redux';
import copyReducer from './reducers';

const rootReducer = combineReducers({
  copy: copyReducer,
});

export default rootReducer;
