import React from 'react';

import { FaPlus, FaMinus } from 'react-icons/fa';

import './expandCollapseWrapper.less';

export default class ExpandCollapseWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isExpand: props.isExpand || false
    };

    this.expandCollapseHandler = this.expandCollapseHandler.bind(this);
  }

  expandCollapseHandler() {
    this.setState(prevState => ({ isExpand: !prevState.isExpand }));
  }

  get content() {
    const { children } = this.props;
    const { isExpand } = this.state;
    return isExpand && children;
  }

  render() {
    const { name } = this.props;
    const { isExpand } = this.state;

    return (
      <div className="expandCollapseWrapper">
        <div
          className="expandCollapseWrapper__name"
          onClick={this.expandCollapseHandler}
        >
          {isExpand ? <FaMinus/> : <FaPlus/>}
          <span>{name}</span>
        </div>
        {this.content}
      </div>
    );
  }
}