import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [];

const store = createStore(rootReducer, middlewares);

sagaMiddlewares.run(rootSaga);

export default store;
