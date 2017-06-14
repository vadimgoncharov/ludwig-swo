import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatJdan from '../components/StatJdan';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatJdan} from 'shared/types/StatJdan';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statJdan: TStatJdan;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statJdan: state.stats.data.statJdan,
  };
};

class StatJdanContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatJdan {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatJdanContainer);
