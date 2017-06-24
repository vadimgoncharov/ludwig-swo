import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatSlash from '../components/StatSlash';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean;
  statDayInYear: TStatDayInYear;
  statTotal: TStatTotal,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statDayInYear: state.stats.data.statDayInYear,
    statTotal: state.stats.data.statTotal,
  };
};

class StatSlashContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      statDayInYear,
      statTotal,
    } = this.props;
    return (
      <StatSlash
        isFetching={isFetching}
        statDayInYear={statDayInYear}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatSlashContainer);
