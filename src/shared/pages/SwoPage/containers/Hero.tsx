import * as React from 'react';
import {connect} from 'react-redux';

import Hero from '../components/Hero';
import {StoreState} from 'shared/reducers';

const mapStateToProps = (state: StoreState) => {
  return {
    isFetching: state.stats.isFetching,
    statTotal: state.stats.data.statTotal,
  };
};

@connect(mapStateToProps)
export default class HeroContainer extends React.Component<any, void> {
  public render() {
    return (
      <Hero {...this.props} />
    );
  }
}
