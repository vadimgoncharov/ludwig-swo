import * as React from 'react';
import {connect} from 'react-redux';

import DayInYearScale from '../components/DayInYearScale';
import {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

@connect(mapStateToProps)
export default class DayInYearScaleContainer extends React.Component<any, void> {
  render() {
    return (
      <DayInYearScale {...this.props} />
    );
  }
}
