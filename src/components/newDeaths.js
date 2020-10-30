import React from "react";
import NumberFormat from 'react-number-format';

class newDeaths extends React.Component {
  render() {
    return (
        <React.Fragment>
            <span className="new-deaths">
                <NumberFormat thousandSeparator={true} value={this.props.NewDeaths} displayType={'text'} prefix={'+'}/>
            </span>
        </React.Fragment>
        )
    }
}
export default newDeaths;