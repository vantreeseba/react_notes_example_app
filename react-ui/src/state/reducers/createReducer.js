const createReducer = (initial, reducers) => (state = initial, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action.value);
  }

  return state;
}

export default createReducer;
