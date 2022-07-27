import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Grid from '../components/home/Grid';

const MockNav = () => (
  <BrowserRouter>
    <Grid />
  </BrowserRouter>
);

test('renders correctly', () => {
  const tree = renderer
    .create(<MockNav />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
