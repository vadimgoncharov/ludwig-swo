import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import DayInMonthHistogram from './DayInMonthHistogram';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDayInMonth} from 'shared/types/DayInMonth';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  dayInMonth: TDayInMonth;
  total: TTotal,
};
type TProps = TStateFromProps & DispatchProp<TDispatch>;

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    dayInMonth: state.stats.data.dayInMonth,
    total: state.stats.data.total,
  };
};

class StatDayInMonthContainer extends React.Component<TProps, any> {
  public render() {
    const {
      dayInMonth,
      total,
    } = this.props;
    return (
      <DayInMonthHistogram
        dayInMonth={dayInMonth}
        total={total}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatDayInMonthContainer);
