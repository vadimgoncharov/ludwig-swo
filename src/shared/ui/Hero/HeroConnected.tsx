import * as React from 'react';
import {connect} from 'react-redux';
import {fetchStats} from 'shared/actions/stats';
import {changeHeaderSwoDateVisibility} from 'shared/actions/ui';
import Hero from './Hero';

import {TGlobalState} from 'shared/types/GlobalState';
import {TTotal} from 'shared/types/Total';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  isFetching: boolean,
  total: TTotal,
};
type TDispatchFromProps = {
  onHeaderSwoDateVisibilityChange: (isVisible: boolean) => void,
  onFetchLinkClick: () => void,
}

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    total: state.stats.data.total,
  };
};

const mapDispatchToProps = (dispatch: TDispatch): TDispatchFromProps => {
  return {
    onHeaderSwoDateVisibilityChange: (isVisible: boolean): void => {
      dispatch(changeHeaderSwoDateVisibility(isVisible));
    },
    onFetchLinkClick: () => {
      dispatch(fetchStats());
    },
  };
};

class HeroContainer  extends React.Component<TStateFromProps & TDispatchFromProps, any> {
  public render() {
    const {
      isFetching,
      total,
      onHeaderSwoDateVisibilityChange,
      onFetchLinkClick,
    } = this.props;
    return (
      <Hero
        isFetching={isFetching}
        total={total}
        onHeaderSwoDateVisibilityChange={onHeaderSwoDateVisibilityChange}
        onFetchLinkClick={onFetchLinkClick}
      />
    );
  }
}

export default connect<TStateFromProps, TDispatchFromProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(HeroContainer);
