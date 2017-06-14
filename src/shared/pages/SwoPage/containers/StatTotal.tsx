import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatTotal from '../components/StatTotal';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

class StatTotalContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatTotal {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatTotalContainer);
