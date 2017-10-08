import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import YearGradient from './YearGradient';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDayInYear} from 'shared/types/DayInYear';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
import {TMinMax} from 'shared/types/MinMax';
type TStateFromProps = {
  isFetching: boolean;
  dayInYear: TDayInYear;
  total: TTotal,
  minMax: TMinMax,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    dayInYear: state.stats.data.dayInYear,
    total: state.stats.data.total,
    minMax: state.stats.data.minMax,
  };
};

class YearGradientContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      dayInYear,
      total,
      minMax,
    } = this.props;
    return (
      <YearGradient
        isFetching={isFetching}
        dayInYear={dayInYear}
        minMax={minMax}
        total={total}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(YearGradientContainer);
