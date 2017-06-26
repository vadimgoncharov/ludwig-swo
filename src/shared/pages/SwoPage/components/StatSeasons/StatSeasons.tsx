import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import {
  getSeasonName,
  SEASON_NAME_AUTUMN,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_WINTER,
} from 'shared/utils/date';

import {TStatSeasons} from 'shared/types/StatSeasons';

import './StatSeasons.scss';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';
import {convertRange} from 'shared/utils/math';
import {TStatTotal} from 'shared/types/StatTotal';

type TProps = {
  isFetching: boolean,
  statSeasons: TStatSeasons,
  statTotal: TStatTotal,
};

export default class StatSeasons extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    const currSeasonKey: string = getSeasonName(this.props.statTotal.date);

    const {winter, spring, summer, autumn} = this.props.statSeasons;

    const min = Math.min(winter, spring, summer, autumn);
    const max = Math.max(winter, spring, summer, autumn);
    const percentMin = 80;
    const percentMax = 100;
    const winterLineValue = convertRange(winter, min, max, percentMin, percentMax);
    const springLineValue = convertRange(spring, min, max, percentMin, percentMax);
    const summerLineValue = convertRange(summer, min, max, percentMin, percentMax);
    const autumnLineValue = convertRange(autumn, min, max, percentMin, percentMax);

    return (
      <Waypoint>
        <div className="StatSeasons">
          <div className="StatSeasons-items">
            {this.renderItem(winter, winterLineValue, 'Зимой', SEASON_NAME_WINTER, currSeasonKey)}
            {this.renderItem(spring, springLineValue, 'Весной', SEASON_NAME_SPRING, currSeasonKey)}
            {this.renderItem(summer, summerLineValue, 'Летом', SEASON_NAME_SUMMER, currSeasonKey)}
            {this.renderItem(autumn, autumnLineValue, 'Осенью', SEASON_NAME_AUTUMN, currSeasonKey)}
          </div>
        </div>
      </Waypoint>
    );
  }

  private renderItem = (
    value: number,
    valueLine: number,
    seasonName: string,
    seasonKey: string,
    currSeasonKey: string) => {
    const isSelected = seasonKey === currSeasonKey;
    const className = classNames('StatSeasons-item', `is-${seasonKey}`, {'is-selected': isSelected});
    return (
      <div className={className}>
        <div className="StatSeasons-itemName">{seasonName}</div>
        <div className="StatSeasons-itemLine">
          <div className="StatSeasons-itemLineValue" style={{width: `${valueLine}%`}} />
        </div>
        <div className="StatSeasons-itemValue">{formatValueToTimesWithPluralize(value)}</div>
      </div>
    );
  };
}
