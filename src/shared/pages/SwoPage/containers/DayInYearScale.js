// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import DayInYearScale from '../components/DayInYearScale';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

@connect(mapStateToProps)
export default class DayInYearScaleContainer extends Component {
  render() {
    return (
      <DayInYearScale {...this.props} />
    );
  }
}
