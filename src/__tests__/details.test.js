import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../redux/configureStore';
import Details from '../components/details/Details';

const MockNav = () => (
  <BrowserRouter>
    <Details />
  </BrowserRouter>
);

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockNav />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
