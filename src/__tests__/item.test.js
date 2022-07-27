import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Item from '../components/home/Item';

const MockNav = () => (
  <BrowserRouter>
    <Item />
  </BrowserRouter>
);

test('renders correctly', () => {
  const tree = renderer
    .create(<MockNav />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
