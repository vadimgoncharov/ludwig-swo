import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import SumColumns from './SumColumns';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
import {TMonthsDay} from 'shared/types/MonthsDay';
import {TMonths} from 'shared/types/Months';
type TStateFromProps = {
  isFetching: boolean;
  total: TTotal,
  months: TMonths,
  monthsDay: TMonthsDay,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    total: state.stats.data.total,
    months: state.stats.data.months,
    monthsDay: state.stats.data.monthsDay,
  };
};

class SumColumnsContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      total,
      months,
      monthsDay,
    } = this.props;
    return (
      <SumColumns
        isFetching={isFetching}
        total={total}
        months={months}
        monthsDay={monthsDay}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(SumColumnsContainer);
