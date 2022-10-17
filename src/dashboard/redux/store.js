import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhandcers = composeWithDevTools();

const store = createStore(rootReducer, composeEnhandcers);

export default store;
