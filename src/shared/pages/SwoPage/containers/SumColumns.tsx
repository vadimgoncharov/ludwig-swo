import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import SumColumns from '../components/SumColumns';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMonthsDay} from 'shared/types/StatMonthsDay';
import {TStatMonths} from 'shared/types/StatMonths';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal,
  statMonths: TStatMonths,
  statMonthsDay: TStatMonthsDay,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
    statMonths: state.stats.data.statMonths,
    statMonthsDay: state.stats.data.statMonthsDay,
  };
};

class SumColumnsContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      statTotal,
      statMonths,
      statMonthsDay,
    } = this.props;
    return (
      <SumColumns
        isFetching={isFetching}
        statTotal={statTotal}
        statMonths={statMonths}
        statMonthsDay={statMonthsDay}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(SumColumnsContainer);
