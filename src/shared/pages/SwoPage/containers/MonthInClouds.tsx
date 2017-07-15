import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import MonthInClouds from '../components/MonthInClouds';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';

type TStateFromProps = {
  isFetching: boolean;
  statDayInYear: TStatDayInYear;
  statTotal: TStatTotal,
  statMinMax: TStatMinMax,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statDayInYear: state.stats.data.statDayInYear,
    statTotal: state.stats.data.statTotal,
    statMinMax: state.stats.data.statMinMax,
  };
};

class MonthInCloudsContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      statDayInYear,
      statTotal,
      statMinMax,
    } = this.props;
    return (
      <MonthInClouds
        isFetching={isFetching}
        statDayInYear={statDayInYear}
        statMinMax={statMinMax}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(MonthInCloudsContainer);
