import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import NumFreqInYear from './NumFreqInYear';

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

class NumFreqInYearContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <NumFreqInYear {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(NumFreqInYearContainer);
