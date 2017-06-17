import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatDayInMonth from '../components/StatDayInMonth';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatDayInMonth} from 'shared/types/StatDayInMonth';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean;
  statDayInMonth: TStatDayInMonth;
  statTotal: TStatTotal,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statDayInMonth: state.stats.data.statDayInMonth,
    statTotal: state.stats.data.statTotal,
  };
};

class StatDayInMonthContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {
      isFetching,
      statDayInMonth,
      statTotal,
    } = this.props;
    return (
      <StatDayInMonth
        isFetching={isFetching}
        statDayInMonth={statDayInMonth}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatDayInMonthContainer);
