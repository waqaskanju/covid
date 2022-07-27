import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { loadingBarReducer } from 'react-redux-loading-bar';
import continentReducer, { fetchContinent } from './countries/countries';

// Combine c
const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    countries: continentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.dispatch(fetchContinent());

export default store;
