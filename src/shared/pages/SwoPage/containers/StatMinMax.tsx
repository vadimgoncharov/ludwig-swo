import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatMinMax from '../components/StatMinMax';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatMinMax} from 'shared/types/StatMinMax';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statMinMax: TStatMinMax;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statMinMax: state.stats.data.statMinMax,
  };
};

class StatMinMaxContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatMinMax {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatMinMaxContainer);
