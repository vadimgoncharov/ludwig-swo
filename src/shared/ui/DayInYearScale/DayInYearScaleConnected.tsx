import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import DayInYearScale from './DayInYearScale';

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

class DayInYearScaleContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <DayInYearScale {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(DayInYearScaleContainer);
