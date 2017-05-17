// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats} from 'shared/actions';
import type {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLinkClick: () => {
      dispatch(fetchStats());
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}
