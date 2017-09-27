import * as React from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import * as utils from 'shared/utils';
import * as c from 'shared/constants';
import {
  getSeasonName,
  SEASON_NAME_AUTUMN,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_WINTER,
} from 'shared/utils/date';

import navSectionData from './navSectionData';

import './StatSeasons.scss';

import {TStatTotal} from 'shared/types/StatTotal';
import {TStatSeasons} from 'shared/types/StatSeasons';

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
    const winterLineValue = utils.math.convertRange(winter, min, max, percentMin, percentMax);
    const springLineValue = utils.math.convertRange(spring, min, max, percentMin, percentMax);
    const summerLineValue = utils.math.convertRange(summer, min, max, percentMin, percentMax);
    const autumnLineValue = utils.math.convertRange(autumn, min, max, percentMin, percentMax);
    const winterColor = c.monthColors[0].bgStart;
    const springColor = c.monthColors[3].bgStart;
    const summerColor = c.monthColors[6].bgStart;
    const autumnColor = c.monthColors[10].bgStart;

    return (
      <section className="StatSeasons">
        <SectionContent navSection={navSectionData}>
          <div className="StatSeasons-title">{navSectionData.title}</div>
          <div className="StatSeasons-items">
            {this.renderItem(winter, winterLineValue, 'Зимой', SEASON_NAME_WINTER, currSeasonKey, winterColor)}
            {this.renderItem(spring, springLineValue, 'Весной', SEASON_NAME_SPRING, currSeasonKey, springColor)}
            {this.renderItem(summer, summerLineValue, 'Летом', SEASON_NAME_SUMMER, currSeasonKey, summerColor)}
            {this.renderItem(autumn, autumnLineValue, 'Осенью', SEASON_NAME_AUTUMN, currSeasonKey, autumnColor)}
          </div>
        </SectionContent>
      </section>
    );
  }

  private renderItem = (
    value: number,
    valueLine: number,
    seasonName: string,
    seasonKey: string,
    currSeasonKey: string,
    color: string) => {
    const isSelected = seasonKey === currSeasonKey;
    const className = classNames('StatSeasons-item', `is-${seasonKey}`, {'is-selected': isSelected});
    return (
      <div className={className} style={{color}}>
        <div className="StatSeasons-itemName">{seasonName}</div>
        <div className="StatSeasons-itemLine">
          <div
            className="StatSeasons-itemLineValue"
            style={{width: `${valueLine}%`, backgroundColor: color}}
          />
        </div>
        <div className="StatSeasons-itemValue">{utils.format.formatValueToTimesWithPluralize(value)}</div>
      </div>
    );
  };
}
