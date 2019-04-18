import {combineReducers} from 'redux';
import createReducer from './createReducer';

import notelist from './notelist';

export default combineReducers({
  notes: createReducer(notelist.initial, notelist.reducers)
});
