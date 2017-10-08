import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Square from './Square';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TLastGeneratedDate} from 'shared/types/LastGeneratedDate';
type TStateFromProps = {
  isFetching: boolean;
  lastGeneratedDate: TLastGeneratedDate;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    lastGeneratedDate: state.stats.data.lastGeneratedDate,
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
