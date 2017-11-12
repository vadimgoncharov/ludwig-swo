import * as React from 'react';

type TProps = {
  triggerAnimation: boolean,
};

export default class JdanNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.triggerAnimation !== nextProps.triggerAnimation) {
      if (nextProps.triggerAnimation) {
        this.rootEl.classList.add('is-hover_yes');
      } else {
        this.rootEl.classList.remove('is-hover_yes');
      }
    }
  }

  public render() {
    return (
      <div className="NavSection" ref={this.onRefSet}>
        <div className="JdanImg">
          <div className="JdanImg-body" />
        </div>
      </div>
    );
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
  };
}
