import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import MinMax from './MinMax';

import {TGlobalState} from 'shared/types/GlobalState';
import {TMinMax} from 'shared/types/MinMax';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  isFetching: boolean;
  minMax: TMinMax;
};
const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    minMax: state.stats.data.minMax,
  };
};
class MinMaxContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <MinMax {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(MinMaxContainer);
