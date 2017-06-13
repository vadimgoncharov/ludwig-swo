import * as React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats} from 'shared/actions';
import {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLinkClick: () => {
      dispatch(fetchStats());
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends React.Component<any, void> {
  public render() {
    return (
      <Header {...this.props} />
    );
  }
}
