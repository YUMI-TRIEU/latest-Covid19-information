import React from "react";
import { shallow } from "enzyme";
import Covid19 from "./components/covid19";

describe('Covid19', () => {
  beforeAll(() => {
    window.fetch = jest.fn(); 
  });
  
  let wrapper0;
  
  beforeEach(() => {
    wrapper0 = shallow(<Covid19 />, { disableLifecycleMethods: true });
  });
  
  afterEach(() => {
    wrapper0.unmount();
  });
  
  it("Must render a loading span before api call success", () => {
    expect(wrapper0.find("span.spinner").exists()).toBeTruthy();
  });

  it('Fetches data from server when server returns a successful response', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
    const wrapper = shallow(<Covid19 />);
                            
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.covid19api.com/summary');

    process.nextTick(() => {

      // Expect state after fetches data successfully
      expect(wrapper.state()).toEqual({        
        error: null,
        isLoaded: true,
        covidApiData: {},
        keyword: null
      });
      global.fetch.mockClear();
      done();
    });
  });
});