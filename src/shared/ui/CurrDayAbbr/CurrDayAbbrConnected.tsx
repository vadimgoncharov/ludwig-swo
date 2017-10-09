import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import CurrDayAbbr from './CurrDayAbbr';

import {TGlobalState} from 'shared/types/GlobalState';
import {TTotal} from 'shared/types/Total';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  total: TTotal;
};
type TProps = TStateFromProps & DispatchProp<TDispatch>;

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    total: state.stats.data.total,
  };
};

class CurrDayAbbrContainer extends React.Component<TProps, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <CurrDayAbbr {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(CurrDayAbbrContainer);
