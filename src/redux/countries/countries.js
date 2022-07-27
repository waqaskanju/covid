import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as API from './api';

// Create action type constant.
const LOAD_CONTINENT = 'cases/load-continent';
const LOAD_COUNTRY = 'cases/load-country';

// add action type to load continent data.
export const loadContinent = (payload) => ({
  type: LOAD_CONTINENT,
  payload,
});

// add action type to load country data.
export const loadCountry = (payload) => ({
  type: LOAD_COUNTRY,
  payload,
});

// Fetch data about a continent
export const fetchContinent = (continent) => async (dispatch) => {
  // show loading bar when loading data.
  dispatch(showLoading());
  const map = await API.getContinent(continent);

  const data = Object.values(map).reduce((accumulator, currentValue) => {
    const { All: { country, confirmed } } = currentValue;
    accumulator.items.push({ name: country, confirmed });
    accumulator.totalConfirmed += confirmed;
    return accumulator;
  }, {
    totalConfirmed: 0,
    items: [],
  });

  data.items = data.items.sort((a, b) => b.confirmed - a.confirmed);

  dispatch(loadContinent(data));
  dispatch(hideLoading());
};

// Fetch data when a country name is given.
export const fetchCountry = (name) => async (dispatch) => {
  // Show the loading bar when geting data.
  dispatch(showLoading());
  const data = await API.getCountry(name);
  dispatch(loadCountry(data));
  // hide loading bar then loading is finished.
  dispatch(hideLoading());
};

const initialState = {
  totalConfirmed: 0,
  items: [],
  selected: null,
};

// Take appropirate action based on action type send.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONTINENT:
      return action.payload;
    case LOAD_COUNTRY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default reducer;
