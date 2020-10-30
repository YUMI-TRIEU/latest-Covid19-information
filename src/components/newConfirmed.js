import React from "react";
import NumberFormat from 'react-number-format';

class NewConfirmed extends React.Component {
  render() {
    return (
        <React.Fragment>
            <span className="new-confirmed">
                <NumberFormat thousandSeparator={true} value={this.props.NewConfirmed} displayType={'text'} prefix={'+'}/>
            </span>
        </React.Fragment>
        )
    }
}
export default NewConfirmed;