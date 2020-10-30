import React from "react";
import NumberFormat from 'react-number-format';
import NewConfirmed from "./new.js";
import NewDeaths from "./newDeaths.js";
class Covid19 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      covidApiData: [],
      keyword: null
    }
  }
  fetchCovid19Data = () => {
    let covid19SumaryAPI = 'https://api.covid19api.com/summary';
    fetch(covid19SumaryAPI)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            covidApiData: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  onChangeHandler = async e => {
    this.setState({ keyword: e.target.value });
  };
  componentDidMount = () => {
    this.fetchCovid19Data();
  }
  render() {
    const { error, isLoaded, covidApiData, keyword } = this.state;
    var tempDate = new Date();
    var date = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    var hours = tempDate.getHours()+'h'+ tempDate.getMinutes();
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <div className="summary-block">
            <div className="container">
              <h1 className="title">Covid-19 trên Thế giới</h1>
              <p className='sumary-txt'>Tính đến {hours}, {date} (Tổng cộng có <NumberFormat thousandSeparator={true} value={covidApiData.Global.TotalConfirmed} displayType={'text'} /> ca nhiễm)</p>
              <div className="content">
                <div className="global-confirmed">
                  <span className="txt">Nhiễm</span>
                  <span className="total">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.TotalConfirmed} displayType={'text'} />
                  </span>
                  <span className="new">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.NewConfirmed} displayType={'text'} prefix={'+'}/>
                  </span>                  
                </div>
                <div className="global-deaths">
                  <span className="txt">Tử vong</span>
                  <span className="total">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.TotalDeaths} displayType={'text'}/>
                  </span>
                  <span className="new">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.NewDeaths} displayType={'text'} prefix={'+'}/>
                  </span>
                  
                </div>
                <div className="global-recovered">
                  <span className="txt">Khỏi</span>
                  <span className="total">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.TotalRecovered} displayType={'text'}/>
                  </span>
                  <span className="new">
                    <NumberFormat thousandSeparator={true} value={covidApiData.Global.NewRecovered} displayType={'text'} prefix={'+'}/>
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="countries-block">
            <div className="container">
              <div className="inner">
                <h2 className="title">Thống kê theo quốc gia: </h2>
                <div className="search-block">
                  <input
                    value={this.state.value}
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Tìm theo tên quốc gia"
                  />
              </div>
                </div>
              <div className="content">
                <div className="header">
                  <div className='country'>Quốc gia</div>
                  <div>Nhiễm</div>
                  <div className="new">Mới</div>
                  <div>Tử vong</div>
                  <div className="new">Mới</div>
                  <div>Khỏi</div>
                </div>
                <div className="countries">
                  {
                    covidApiData.Countries.filter((country)=>{
                      if(keyword==null)
                      return country
                      else if (country.Country.toLowerCase().includes(keyword.toLowerCase())) {
                        return country
                      }
                    }).map((country, index) => (
                      <div className="item" key={index}>
                        <div className='country'>{country.Country}</div>
                        <div className="confirmed">
                          
                          <NumberFormat thousandSeparator={true} value={country.TotalConfirmed} displayType={'text'}/>
                        </div>
                        <div className="new">{country.NewConfirmed !== 0 ? <NewConfirmed NewConfirmed={country.NewConfirmed}/> : ''} </div>
                        <div className="deaths">
                          <NumberFormat thousandSeparator={true} value={country.TotalDeaths} displayType={'text'} />
                        </div>
                        <div className="new">{country.NewDeaths !== 0 ? <NewDeaths NewDeaths={country.NewDeaths}/> : ''} </div>
                        <div className="recovered">
                          <NumberFormat thousandSeparator={true} value={country.TotalRecovered} displayType={'text'} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}
export default Covid19;