// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import StatJdan from '../components/StatJdan';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statJdan: state.stats.data.statJdan,
  };
};

@connect(mapStateToProps)
export default class StatJdanContainer extends Component {
  render() {
    return (
      <StatJdan {...this.props} />
    );
  }
}
