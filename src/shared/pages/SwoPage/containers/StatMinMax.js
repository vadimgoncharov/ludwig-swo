// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import StatMinMax from '../components/StatMinMax';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statMinMax: state.stats.data.statMinMax,
  };
};

@connect(mapStateToProps)
export default class StatMinMaxContainer extends Component {
  render() {
    return (
      <StatMinMax {...this.props} />
    );
  }
}
