import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatSeasons from '../components/StatSeasons';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatSeasons} from 'shared/types/StatSeasons';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean;
  statSeasons: TStatSeasons;
  statTotal: TStatTotal;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statSeasons: state.stats.data.statSeasons,
    statTotal: state.stats.data.statTotal,
  };
};

class StatSeasonsContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatSeasons {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatSeasonsContainer);
