// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import StatTotal from '../components/StatTotal';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

@connect(mapStateToProps)
export default class StatTotalContainer extends Component {
  render() {
    return (
      <StatTotal {...this.props} />
    );
  }
}
