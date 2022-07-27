import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as API from './api';

// Create action type.
const LOAD_CONTINENT = 'cases/load-continent';
const LOAD_COUNTRY = 'cases/load-country';

export const loadContinent = (payload) => ({
  type: LOAD_CONTINENT,
  payload,
});

export const loadCountry = (payload) => ({
  type: LOAD_COUNTRY,
  payload,
});

export const fetchCountry = (name) => async (dispatch) => {
  dispatch(showLoading());
  const data = await API.getCountry(name);

  dispatch(loadCountry(data));
  dispatch(hideLoading());
};

export const fetchContinent = (continent) => async (dispatch) => {
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

const initialState = {
  totalConfirmed: 0,
  items: [],
  selected: null,
};

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
