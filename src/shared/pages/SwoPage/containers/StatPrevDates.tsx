import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatPrevDates from '../components/StatPrevDates';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatPrevDates} from 'shared/types/StatPrevDates';

type TStateFromProps = {
  isFetching: boolean;
  statPrevDates: TStatPrevDates;
};

const mapStateToProps = (state: TGlobalState) => {
  return {
    isFetching: state.stats.isFetching,
    statPrevDates: state.stats.data.statPrevDates,
  };
};

class StatPrevDatesContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, void> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatPrevDates {...this.props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatPrevDatesContainer);
