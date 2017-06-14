import * as React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats} from 'shared/actions';
import {TGlobalState} from 'shared/types/GlobalState';
import {TDispatch} from 'shared/types/Dispatch';

interface IStateFromProps {
  isFetching: boolean;
}

interface IDispatchFromProps {
  onFetchLinkClick: () => void;
}

const mapStateToProps = (state: TGlobalState): IStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
  };
};

const mapDispatchToProps = (dispatch: TDispatch): IDispatchFromProps => {
  return {
    onFetchLinkClick: () => {
      dispatch(fetchStats());
    },
  };
};

class HeaderContainer extends React.Component<IStateFromProps & IDispatchFromProps, any> {
  public render() {
    return (
      <Header {...this.props} />
    );
  }
}

export default connect<IStateFromProps, IDispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
