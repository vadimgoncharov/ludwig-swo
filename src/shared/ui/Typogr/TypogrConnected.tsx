import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Typogr from './Typogr';

import {TGlobalState} from 'shared/types/GlobalState';
import {TTotal} from 'shared/types/Total';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  total: TTotal;
};
const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    total: state.stats.data.total,
  };
};

class TypogrContainer  extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {total} = this.props;
    return (
      <Typogr total={total} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(TypogrContainer);
