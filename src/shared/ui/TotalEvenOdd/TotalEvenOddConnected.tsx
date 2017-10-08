import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import TotalEvenOdd from './TotalEvenOdd';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotalEvenOdd} from 'shared/types/TotalEvenOdd';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  isFetching: boolean;
  totalEvenOdd: TTotalEvenOdd;
  total: TTotal;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    totalEvenOdd: state.stats.data.totalEvenOdd,
    total: state.stats.data.total,
  };
};

class TotalEvenOddContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <TotalEvenOdd {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(TotalEvenOddContainer);
