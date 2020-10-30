import React from 'react';
import { shallow } from "enzyme";
import App from './App';
import Covid19 from './components/covid19';

test('Should render Covid19 component', () => {
  const wrapper = shallow(<App />);
  const covid19 = wrapper.find(Covid19);
  expect(covid19.exists()).toBe(true);
});
