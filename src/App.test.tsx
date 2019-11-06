import React from 'react';
import ReactDOM from 'react-dom';
import HomepageLayout from './menu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomepageLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});
