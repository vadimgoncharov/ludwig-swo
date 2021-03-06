import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import StatAround from './Around';

import {TGlobalState} from 'shared/types/GlobalState';
import {TAround} from 'shared/types/Around';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  around: TAround;
};
type TProps = TStateFromProps & DispatchProp<TDispatch>;

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    around: state.stats.data.around,
  };
};

class StatAroundContainer extends React.Component<TProps, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatAround {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatAroundContainer);
