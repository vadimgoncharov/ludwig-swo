import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import StatHalfYear from '../components/StatHalfYear';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatHalfYear} from 'shared/types/StatHalfYear';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statHalfYear: TStatHalfYear;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statHalfYear: state.stats.data.statHalfYear,
  };
};

class StatHalfYearContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <StatHalfYear {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(StatHalfYearContainer);
