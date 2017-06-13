import * as React from 'react';
import {connect} from 'react-redux';

import StatMinMax from '../components/StatMinMax';
import {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statMinMax: state.stats.data.statMinMax,
  };
};

@connect(mapStateToProps)
export default class StatMinMaxContainer extends React.Component<any, void> {
  render() {
    return (
      <StatMinMax {...this.props} />
    );
  }
}
