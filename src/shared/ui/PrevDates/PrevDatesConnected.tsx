import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import PrevDates from './PrevDates';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TPrevDates} from 'shared/types/PrevDates';
type TStateFromProps = {
  isFetching: boolean;
  prevDates: TPrevDates;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    prevDates: state.stats.data.prevDates,
  };
};

class PrevDatesContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <PrevDates {...this.props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(PrevDatesContainer);
