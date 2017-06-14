import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import DayInYearScale from '../components/DayInYearScale';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatTotal} from 'shared/types/StatTotal';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

class DayInYearScaleContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <DayInYearScale {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(DayInYearScaleContainer);
