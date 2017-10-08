import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import CurrDayAbbr from './CurrDayAbbr';

import {TGlobalState} from 'shared/types/GlobalState';
import {TTotal} from 'shared/types/Total';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  isFetching: boolean;
  total: TTotal;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    total: state.stats.data.total,
  };
};

class CurrDayAbbrContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <CurrDayAbbr {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(CurrDayAbbrContainer);
