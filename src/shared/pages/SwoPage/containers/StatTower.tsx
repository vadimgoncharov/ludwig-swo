import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatTower from '../components/StatTower';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStatTower} from 'shared/types/StatTower';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal,
  statMinMax: TStatMinMax,
  statTower: TStatTower,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
    statMinMax: state.stats.data.statMinMax,
    statTower: state.stats.data.statTower,
  };
};

class StatTowerContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      statTotal,
      statMinMax,
      statTower,
    } = this.props;
    return (
      <StatTower
        isFetching={isFetching}
        statMinMax={statMinMax}
        statTotal={statTotal}
        statTower={statTower}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatTowerContainer);
