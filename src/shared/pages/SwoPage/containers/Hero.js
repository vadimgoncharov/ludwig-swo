// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Hero from '../components/Hero';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

@connect(mapStateToProps)
export default class HeroContainer extends Component {
  render() {
    return (
      <Hero {...this.props} />
    );
  }
}
