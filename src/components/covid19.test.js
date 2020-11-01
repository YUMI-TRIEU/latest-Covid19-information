import React from "react";
import { shallow, mount, unmount } from "enzyme";
import Covid19 from "./covid19";

describe('Covid19 component test', () => {
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
    const mockSuccessResponse = {
          "Message": "",
          "Global": {
            "NewConfirmed": 565744,
            "TotalConfirmed": 45576990,
            "NewDeaths": 7839,
            "TotalDeaths": 1188787,
            "NewRecovered": 254986,
            "TotalRecovered": 30569006
          },
          "Countries": [{
              "Country": "Afghanistan",
              "CountryCode": "AF",
              "Slug": "afghanistan",
              "NewConfirmed": 66,
              "TotalConfirmed": 41334,
              "NewDeaths": 1,
              "TotalDeaths": 1533,
              "NewRecovered": 19,
              "TotalRecovered": 34258,
              "Date": "2020-11-01T02:32:03Z",
              "Premium": {}
            },
            {
              "Country": "Albania",
              "CountryCode": "AL",
              "Slug": "albania",
              "NewConfirmed": 319,
              "TotalConfirmed": 20634,
              "NewDeaths": 3,
              "TotalDeaths": 502,
              "NewRecovered": 90,
              "TotalRecovered": 11097,
              "Date": "2020-11-01T02:32:03Z",
              "Premium": {}
            }
          ],
          "Date": "2020-11-01T02:32:03Z"
        };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Covid19 />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.covid19api.com/summary');

    process.nextTick(() => {
//       console.log(wrapper.debug());
      // Expect state after fetches data successfully
      expect(wrapper.state()).toEqual({
        error: null,
        isLoaded: true,
        covidApiData: {
          "Message": "",
          "Global": {
            "NewConfirmed": 565744,
            "TotalConfirmed": 45576990,
            "NewDeaths": 7839,
            "TotalDeaths": 1188787,
            "NewRecovered": 254986,
            "TotalRecovered": 30569006
          },
          "Countries": [{
              "Country": "Afghanistan",
              "CountryCode": "AF",
              "Slug": "afghanistan",
              "NewConfirmed": 66,
              "TotalConfirmed": 41334,
              "NewDeaths": 1,
              "TotalDeaths": 1533,
              "NewRecovered": 19,
              "TotalRecovered": 34258,
              "Date": "2020-11-01T02:32:03Z",
              "Premium": {}
            },
            {
              "Country": "Albania",
              "CountryCode": "AL",
              "Slug": "albania",
              "NewConfirmed": 319,
              "TotalConfirmed": 20634,
              "NewDeaths": 3,
              "TotalDeaths": 502,
              "NewRecovered": 90,
              "TotalRecovered": 11097,
              "Date": "2020-11-01T02:32:03Z",
              "Premium": {}
            }
          ],
          "Date": "2020-11-01T02:32:03Z"
        },
        keyword: null
      }); 
      global.fetch.mockClear();
      done();
    });
  });
});
