import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import analytics from 'shared/services/analytics';
import {GOAL_ID_JDAN_TOGGLE_BUTTON_CLICK} from 'shared/constants/analytics';
import navSectionData from './navSectionData';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import './Jdan.scss';

import {TJdan} from 'shared/types/Jdan';
import {TJdanValueAtDayNum} from 'shared/types/JdanValueAtDayNum';
enum TToggleSelectedKey {hal, ch}
type TProps = {
  jdan: TJdan,
};
type TState = {
  togglerSelectedKey: TToggleSelectedKey,
};

export default class Jdan extends React.Component<TProps, TState> {
  public state = {
    togglerSelectedKey: TToggleSelectedKey.ch,
  };

  public render() {
    const {jdan} = this.props;
    const items = jdan;
    const {togglerSelectedKey} = this.state;
    const togglerHalClassName = classNames('Jdan-toggler is-hal', {
      'is-selected': togglerSelectedKey === TToggleSelectedKey.hal,
    });
    const togglerChClassName = classNames('Jdan-toggler is-ch', {
      'is-selected': togglerSelectedKey === TToggleSelectedKey.ch,
    });
    const rootClassName = classNames('Jdan', {
      'is-halSelected': togglerSelectedKey === TToggleSelectedKey.hal,
      'is-chSelected': togglerSelectedKey === TToggleSelectedKey.ch,
    });

    return (
      <section className={rootClassName}>
        <SectionContent navSection={navSectionData}>
          <div className="Jdan-title">{navSectionData.title}</div>
          <div className="Jdan-subTitle">
            Если бы рост
            Ждана Филиппова{' '}
            <span className={togglerChClassName} onClick={this.onTogglerChClick}>менялся</span>{' '}
            либо <span className={togglerHalClassName} onClick={this.onTogglerHalClick}>галлюцинировал</span>{' '}
            в&nbsp;зависимости от&nbsp;количества открытий сайта,{' '}
            то&nbsp;в&nbsp;разные дни Ждан выглядел бы вот так:
          </div>
          <ol className="Jdan-items">
            {items.map(this.renderItem)}
          </ol>
        </SectionContent>
      </section>
    );
  }

  private onTogglerHalClick = (): void => {
    analytics.reachYaGoal(GOAL_ID_JDAN_TOGGLE_BUTTON_CLICK, {button: 'hallucination'});
    this.setState({
      togglerSelectedKey: TToggleSelectedKey.hal,
    });
  };

  private onTogglerChClick = (): void => {
    analytics.reachYaGoal(GOAL_ID_JDAN_TOGGLE_BUTTON_CLICK, {button: 'changing'});
    this.setState({
      togglerSelectedKey: TToggleSelectedKey.ch,
    });
  };

  private renderItem = (item: TJdanValueAtDayNum, index: number) => {
    const {togglerSelectedKey} = this.state;
    const {dayNum, value, chValue} = item;

    const imgBodyHeight = togglerSelectedKey === TToggleSelectedKey.hal ? value : chValue;
    const imgBodyStyle = {
      height: imgBodyHeight + 'px',
    };

    return (
      <li className="Jdan-item" key={index}>
        <div className="JdanImg">
          <div className="JdanImg-body" style={imgBodyStyle} />
        </div>
       <div className="Jdan-itemDate">{dayNumToDayMonthAccusative(dayNum)}</div>
      </li>
    );
  };
}
