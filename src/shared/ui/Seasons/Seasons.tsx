import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import navSectionData from './navSectionData';
import {
  dayNumToSeasonKey,
  seasonKeyToColor,
  SEASON_NAME_AUTUMN,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_WINTER,
} from 'shared/utils/date';
import {convertRange} from 'shared/utils/math';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';
import './Seasons.scss';

import {TTotal} from 'shared/types/Total';
import {TSeasons} from 'shared/types/Seasons';
type TProps = {
  isFetching: boolean,
  seasons: TSeasons,
  total: TTotal,
};

export default class Seasons extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    const currSeasonKey: string = dayNumToSeasonKey(this.props.total.dayNum);

    const {winter, spring, summer, autumn} = this.props.seasons;

    const min = Math.min(winter, spring, summer, autumn);
    const max = Math.max(winter, spring, summer, autumn);
    const percentMin = 80;
    const percentMax = 100;
    const winterLineValue = convertRange(winter, min, max, percentMin, percentMax);
    const springLineValue = convertRange(spring, min, max, percentMin, percentMax);
    const summerLineValue = convertRange(summer, min, max, percentMin, percentMax);
    const autumnLineValue = convertRange(autumn, min, max, percentMin, percentMax);
    const winterColor = seasonKeyToColor(SEASON_NAME_WINTER).bg;
    const springColor = seasonKeyToColor(SEASON_NAME_SPRING).bg;
    const summerColor = seasonKeyToColor(SEASON_NAME_SUMMER).bg;
    const autumnColor = seasonKeyToColor(SEASON_NAME_AUTUMN).bg;

    return (
      <section className="Seasons">
        <SectionContent navSection={navSectionData}>
          <div className="Seasons-title">{navSectionData.title}</div>
          <div className="Seasons-items">
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
    const className = classNames('Seasons-item', `is-${seasonKey}`, {'is-selected': isSelected});
    return (
      <div className={className} style={{color}}>
        <div className="Seasons-itemName">{seasonName}</div>
        <div className="Seasons-itemLine">
          <div
            className="Seasons-itemLineValue"
            style={{width: `${valueLine}%`, backgroundColor: color}}
          />
        </div>
        <div className="Seasons-itemValue">{formatValueToTimesWithPluralize(value)}</div>
      </div>
    );
  };
}
