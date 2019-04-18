const action = (type, args) => ({type, value: args && args.length ? args[0] : null});
const createAction = (type) => (...args) => action(type, args);

const createActions = (reducers) => {
  return Object.keys(reducers).reduce((acc,key) => {
    return {
      ...acc,
      [key]: createAction(key)
    }
  }, {});
}

export default createActions;

