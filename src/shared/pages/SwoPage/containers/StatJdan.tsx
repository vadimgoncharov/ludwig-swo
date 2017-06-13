import * as React from 'react';
import {connect} from 'react-redux';

import StatJdan from '../components/StatJdan';
import {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statJdan: state.stats.data.statJdan,
  };
};

@connect(mapStateToProps)
export default class StatJdanContainer extends React.Component<any, void> {
  render() {
    return (
      <StatJdan {...this.props} />
    );
  }
}
