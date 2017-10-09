import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import HalfYear from './HalfYear';

import {TGlobalState} from 'shared/types/GlobalState';
import {THalfYear} from 'shared/types/HalfYear';
import {TDispatch} from 'shared/types/Dispatch';
type TStateFromProps = {
  halfYear: THalfYear;
};

const mapStateToProps = (state: TGlobalState): TStateFromProps => {
  return {
    halfYear: state.stats.data.halfYear,
  };
};

class HalfYearContainer extends React.Component<TStateFromProps & DispatchProp<TDispatch>, any> {
  public render() {
    const {dispatch, ...props} = this.props;
    return (
      <HalfYear {...props} />
    );
  }
}

export default connect<TStateFromProps, null, null>(mapStateToProps)(HalfYearContainer);
