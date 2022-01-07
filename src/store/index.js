import { deepClone } from '../utils/index.js';
import localStorageUtils from '../utils/localStorageUtils.js';

export default class Store {
  constructor({ name, defaultState }) {
    this.name = name;
    this.state = localStorageUtils.getState(name) || defaultState;
    this.listeners = [];
  }

  getState(key) {
    return deepClone(this.state[key]);
  }

  dispatch(action) {
    this.state = {
      ...this.state,
      ...this.reducer(deepClone(this.state), action),
    };

    localStorageUtils.setState(this.name, this.state);

    this.listeners.forEach((listener) => listener());
  }

  reducer() {
    /**
     * chileView
     */
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}
