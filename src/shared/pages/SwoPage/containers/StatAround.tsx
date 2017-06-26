import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatAround from '../components/StatAround';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatAround} from 'shared/types/StatAround';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statAround: TStatAround;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statAround: state.stats.data.statAround,
  };
};

class StatAroundContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatAround {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatAroundContainer);
