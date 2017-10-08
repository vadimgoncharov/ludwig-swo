import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import DayInMonthHistogram from './DayInMonthHistogram';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDayInMonth} from 'shared/types/DayInMonth';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  isFetching: boolean;
  dayInMonth: TDayInMonth;
  total: TTotal,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    dayInMonth: state.stats.data.dayInMonth,
    total: state.stats.data.total,
  };
};

class StatDayInMonthContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      dayInMonth,
      total,
    } = this.props;
    return (
      <DayInMonthHistogram
        isFetching={isFetching}
        dayInMonth={dayInMonth}
        total={total}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatDayInMonthContainer);
