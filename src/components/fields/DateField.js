import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'

class DateField extends Component {
  constructor(props) {
    super(props);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    this.state = {
      minDate: minDate,
    }
  }
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      children,
      className,
      ...custom
    } = this.props
    return (
      <DatePicker
        autoOk={true}
        hintText={label}
        openToYearSelection={true}
        onChange={(event, value) => input.onChange(moment(value).format("MM/YYYY"))}
        {...custom}
        formatDate={(value) => moment(value).format("MM / YYYY")}
        textFieldStyle={{ flex: '1 1 auto', marginTop: 22 }}
        minDate={this.state.minDate}
        className={className}
      />
    )
  }
}

export default DateField
