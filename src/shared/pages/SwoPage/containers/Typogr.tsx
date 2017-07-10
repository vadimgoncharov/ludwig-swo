import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

import Typogr from '../components/Typogr';
import {TGlobalState} from 'shared/types/GlobalState';
import {TStatTotal} from 'shared/types/StatTotal';
import {TDispatch} from 'shared/types/Dispatch';

type TStateFromProps = {
  isFetching: boolean;
  statTotal: TStatTotal;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};


class TypogrContainer  extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {
      isFetching,
      statTotal,
    } = this.props;
    return (
      <Typogr
        isFetching={isFetching}
        statTotal={statTotal}
      />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(TypogrContainer);
