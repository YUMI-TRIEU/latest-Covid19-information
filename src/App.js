import React from 'react';
import Covid19 from './components/covid19.js';
import './css/common.scss';
import './css/covid19.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <Covid19 />
      </div> 
    );
  }
}
export default App;
