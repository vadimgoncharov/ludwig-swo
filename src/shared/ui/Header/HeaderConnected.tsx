import * as React from 'react';
import {connect} from 'react-redux';
import {fetchStats} from 'shared/actions/stats';
import Header from './Header';

import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  isFetching: boolean,
  isSwoDateVisible: boolean,
  total: TTotal,
  selectedNavHashes: {[key: string]: boolean},
}
type TDispatchFromProps = {
  onFetchLinkClick: () => void,
}

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    total: state.stats.data.total,
    isSwoDateVisible: state.ui.data.header.isSwoDateVisible,
    selectedNavHashes: state.ui.data.nav.selectedHashes,
  };
};

const mapDispatchToProps = (dispatch: TDispatch): TDispatchFromProps => {
  return {
    onFetchLinkClick: () => {
      dispatch(fetchStats());
    },
  };
};

class HeaderContainer extends React.Component<TStateFromProps & TDispatchFromProps, any> {
  public render() {
    const {
      isFetching,
      isSwoDateVisible,
      selectedNavHashes,
      total,
      onFetchLinkClick,
    } = this.props;
    return (
      <Header
        isFetching={isFetching}
        isSwoDateVisible={isSwoDateVisible}
        onFetchLinkClick={onFetchLinkClick}
        selectedNavHashes={selectedNavHashes}
        total={total}
      />
    );
  }
}

export default connect<TStateFromProps, TDispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
