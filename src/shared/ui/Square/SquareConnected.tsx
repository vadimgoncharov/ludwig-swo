import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Square from './Square';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TMinMax} from 'shared/types/MinMax';
import {TLastGeneratedDate} from 'shared/types/LastGeneratedDate';
type TStateFromProps = {
  lastGeneratedDate: TLastGeneratedDate,
  minMax: TMinMax,
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    lastGeneratedDate: state.stats.data.lastGeneratedDate,
    minMax: state.stats.data.minMax,
  };
};

class SquareContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <Square {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(SquareContainer);
