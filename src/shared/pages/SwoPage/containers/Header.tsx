import * as React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats, fetchStatsPre} from 'shared/actions/stats';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean,
  isSwoDateVisible: boolean,
  statTotal: TStatTotal,
}

type TDispatchFromProps = {
  onFetchLinkClick: () => void,
  onFinishAnimation: () => void,
}

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.dataPre.statTotal,
    isSwoDateVisible: state.ui.data.header.isSwoDateVisible,
  };
};

const mapDispatchToProps = (dispatch: TDispatch): TDispatchFromProps => {
  return {
    onFetchLinkClick: () => {
      dispatch(fetchStatsPre());
    },
    onFinishAnimation: () => {
      dispatch(fetchStats());
    },
  };
};

class HeaderContainer extends React.Component<TStateFromProps & TDispatchFromProps, any> {
  public render() {
    const {
      isFetching,
      isSwoDateVisible,
      statTotal,
      onFetchLinkClick,
      onFinishAnimation,
    } = this.props;
    return (
      <Header
        isFetching={isFetching}
        isSwoDateVisible={isSwoDateVisible}
        onFetchLinkClick={onFetchLinkClick}
        onFinishAnimation={onFinishAnimation}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, TDispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
