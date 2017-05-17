// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import StatPrevDates from '../components/StatPrevDates';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statPrevDates: state.stats.data.statPrevDates,
  };
};

@connect(mapStateToProps)
export default class StatPrevDatesContainer extends Component {
  render() {
    return (
      <StatPrevDates {...this.props} />
    );
  }
}
