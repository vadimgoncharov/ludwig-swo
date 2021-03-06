import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Slashes from './Slashes';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDayInYear} from 'shared/types/DayInYear';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  dayInYear: TDayInYear;
  total: TTotal,
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    dayInYear: state.stats.data.dayInYear,
    total: state.stats.data.total,
  };
};

class SlashesContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      dayInYear,
      total,
    } = this.props;
    return (
      <Slashes
        dayInYear={dayInYear}
        total={total}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(SlashesContainer);
