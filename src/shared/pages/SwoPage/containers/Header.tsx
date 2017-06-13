import * as React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import {fetchStats} from 'shared/actions';
import {StoreState} from 'shared/reducers';

interface IStateFromProps {
  isFetching: boolean;
}

interface IDispatchFromProps {
  onFetchLinkClick: () => void;
}


const mapStateToProps = (state: StoreState): IStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
  };
};

const mapDispatchToProps = (dispatch): IDispatchFromProps => {
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

export default connect<IStateFromProps, IDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
