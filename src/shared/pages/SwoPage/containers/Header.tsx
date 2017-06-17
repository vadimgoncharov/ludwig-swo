import * as React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats} from 'shared/actions';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';
import {TStatTotal} from 'shared/types/StatTotal';

type TStateFromProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
}

type TDispatchFromProps = {
  onFetchLinkClick: () => void,
}

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
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
      statTotal,
      onFetchLinkClick,
    } = this.props;
    return (
      <Header
        isFetching={isFetching}
        onFetchLinkClick={onFetchLinkClick}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, TDispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
