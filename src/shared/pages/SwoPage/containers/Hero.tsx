import * as React from 'react';
import {connect} from 'react-redux';

import {changeHeaderSwoDateVisibility} from 'shared/actions/ui';
import Hero from '../components/Hero';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatTotal} from 'shared/types/StatTotal';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal;
};

type TDispatchFromProps = {
  onHeaderSwoDateVisibilityChange: (isVisible: boolean) => void,
}

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.dataPre.statTotal,
  };
};

const mapDispatchToProps = (dispatch: TDispatch): TDispatchFromProps => {
  return {
    onHeaderSwoDateVisibilityChange: (isVisible: boolean): void => {
      dispatch(changeHeaderSwoDateVisibility(isVisible));
    },
  };
};

class HeroContainer  extends React.Component<TStateFromProps & TDispatchFromProps, any> {
  public render() {
    const {
      isFetching,
      statTotal,
      onHeaderSwoDateVisibilityChange,
    } = this.props;
    return (
      <Hero
        isFetching={isFetching}
        statTotal={statTotal}
        onHeaderSwoDateVisibilityChange={onHeaderSwoDateVisibilityChange}
      />
    );
  }
}

export default connect<TStateFromProps, TDispatchFromProps, null>(mapStateToProps, mapDispatchToProps)(HeroContainer);
