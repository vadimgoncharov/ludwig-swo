import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatSquare from '../components/StatSquare';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatLastGeneratedDate} from 'shared/types/StatLastGeneratedDate';

type TStateFromProps = {
  isFetching: boolean;
  statLastGeneratedDate: TStatLastGeneratedDate;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    statLastGeneratedDate: state.stats.data.statLastGeneratedDate,
  };
};

class StatSquareContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatSquare {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatSquareContainer);
