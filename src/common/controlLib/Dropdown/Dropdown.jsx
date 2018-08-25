import React from 'react';

import {setSize, sizeType} from "../util";

import './dropdown.less';

export default class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isListHidden: true,
    };

    // this.wrapperRef = React.createRef();

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
    // this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  // componentDidMount() {
  //   document.addEventListener('mousedown', this.outsideClickHandler);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.outsideClickHandler);
  // }

  mouseOverHandler() {
    const { isListHidden } = this.state;
    if (isListHidden) {
      this.setState({isListHidden: false})
    }
  }

  mouseOutHandler() {
    const { isListHidden } = this.state;
    if (!isListHidden) {
      this.setState({isListHidden: true})
    }
  }

  // clickHandler() {
  //   // const { isListHidden } = this.state;
  //   // if (isListHidden) {
  //   //   this.setState({isListHidden: false})
  //   // } else {
  //   //   this.setState({isListHidden: true})
  //   // }
  // }
  //
  // outsideClickHandler(event) {
  //   const { isListHidden } = this.state;
  //   console.log("you clicked inside of me")
  //   if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && !isListHidden) {
  //     // this.setState({isListHidden: true})
  //     console.log('You clicked outside of me!');
  //   }
  // }

  get list() {
    const { list } = this.props;

    return list;
  }

  render() {
    const { children, size } = this.props;
    const { isListHidden } = this.state;

    return (
      <div
        className="ec-dropdown"
        onMouseOver={this.mouseOverHandler}
        onMouseOut={this.mouseOutHandler}
        // onClick={this.clickHandler}
        // ref={this.wrapperRef}
      >
        <div className={`ec-dropdown__handler ${setSize('ec-dropdown__handler', size)}`} >
          {children}
        </div>
        <div
          className={`ec-dropdown__list ec-dropdown__list--hidden-${isListHidden}`}
        >
          {this.list}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  className: '',
  size: sizeType.MD
};