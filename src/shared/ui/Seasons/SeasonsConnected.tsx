import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import Seasons from './Seasons';

import {TGlobalState} from 'shared/types/GlobalState';
import {TSeasons} from 'shared/types/Seasons';
import {TDispatch} from 'shared/types/Dispatch';
import {TTotal} from 'shared/types/Total';
type TStateFromProps = {
  isFetching: boolean;
  seasons: TSeasons;
  total: TTotal;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    seasons: state.stats.data.seasons,
    total: state.stats.data.total,
  };
};

class SeasonsContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <Seasons {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(SeasonsContainer);
