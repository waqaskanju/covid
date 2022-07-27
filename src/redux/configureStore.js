import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { loadingBarReducer } from 'react-redux-loading-bar';
import countriesReducer, { fetchCountries } from './countries/countries';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    countries: countriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.dispatch(fetchCountries());

export default store;
