import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Jdan from './Jdan';

import {TGlobalState} from 'shared/types/GlobalState';
import {TJdan} from 'shared/types/Jdan';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  jdan: TJdan;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    jdan: state.stats.data.jdan,
  };
};

class JdanContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <Jdan {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(JdanContainer);
