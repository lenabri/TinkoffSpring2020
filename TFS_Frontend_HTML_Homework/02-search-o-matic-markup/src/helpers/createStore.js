export const createStore = (initialState, actions) => {
  let state = initialState;
  let listeners = [];
  let bindedActions = {};

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => (listeners = listeners.filter((l) => l !== listener));
  };

  const setState = (update) => {
    state = Object.assign({}, state, update);
    listeners.forEach((listener) => listener(state));
    return state;
  };

  const getState = () => state;

  const storeApi = {
    subscribe,
    setState,
    getState,
  };

  if (typeof actions === 'function') {
    actions = actions(storeApi);
  }

  for (let action in actions) {
    if (
      Object.prototype.hasOwnProperty.call(actions, action) &&
      typeof actions[action] === 'function'
    ) {
      bindedActions[action] = (...args) => {
        const result = actions[action](state, ...args);

        if (typeof result.then === 'function') {
          return result.then(setState);
        }

        return setState(result);
      };
    }
  }

  return Object.assign({}, storeApi, bindedActions);
};
