import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatTotalEvenOdd from '../components/StatTotalEvenOdd';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotalEvenOdd} from 'shared/types/StatTotalEvenOdd';

type TStateFromProps = {
  isFetching: boolean;
  statTotalEvenOdd: TStatTotalEvenOdd;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotalEvenOdd: state.stats.data.statTotalEvenOdd,
  };
};

class StatTotalEvenOddContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatTotalEvenOdd {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatTotalEvenOddContainer);
