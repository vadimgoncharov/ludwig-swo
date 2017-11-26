import * as React from 'react';
import * as OrelImg from './navSectionOrel.jpg';
import * as ReshkaImg from './navSectionReshka.jpg';

type TProps = {
  triggerAnimation: boolean,
};

export default class TotalEvenOddNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.triggerAnimation !== nextProps.triggerAnimation) {
      if (nextProps.triggerAnimation) {
        this.rootEl.classList.add('is-hover');
      } else {
        this.rootEl.classList.remove('is-hover');
      }
    }
  }

  public render() {
    return (
      <div className="NavSection is-totalEvenOdd" ref={this.onRefSet}>
        <div
          className="NavSectionImg is-orel"
          style={{
            backgroundImage: `url(${OrelImg})`,
          }}
        />
        <div
          className="NavSectionImg is-reshka"
          style={{
            backgroundImage: `url(${ReshkaImg})`,
          }}
        />
      </div>
    );
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
  };
}
