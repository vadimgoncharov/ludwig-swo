import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Tower from './Tower';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
import {TMinMax} from 'shared/types/MinMax';
import {TTower} from 'shared/types/Tower';
type TStateFromProps = {
  total: TTotal,
  minMax: TMinMax,
  tower: TTower,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    total: state.stats.data.total,
    minMax: state.stats.data.minMax,
    tower: state.stats.data.tower,
  };
};

class TowerContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      total,
      minMax,
      tower,
    } = this.props;
    return (
      <Tower
        minMax={minMax}
        total={total}
        tower={tower}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(TowerContainer);
