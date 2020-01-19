import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';

describe('App', () => {
  it('Should match snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot()
  });

  it('renders without crashing', () => {
    const component = mount(<App />);
    expect(component).toHaveLength(1);
  });
})

