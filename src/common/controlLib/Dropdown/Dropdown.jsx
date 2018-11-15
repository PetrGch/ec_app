import React from 'react';

import {setSize, sizeType} from '../util';

import './dropdown.less';

function Item({index, value, selectedItem, selectItem}) {
  const takeSelectData = () => {
    selectItem({index, value});
  };
  const isActive = selectedItem.index === index || selectedItem.index === 'DEFAULT';
  return (
    <li
      className={`ec-dropdownList__item ec-dropdownList__item--active-${isActive}`}
      onClick={takeSelectData}
    >{value}</li>
  );
}

function prepopulateSelectedValue(list, selectedIndex) {
  let selectedItem = {value: 'Select value', index: 'DEFAULT'};
  if (Array.isArray(list) && list.length !== 0) {
    if (selectedIndex) {
      list.some(item => {
        if (item.index === selectedIndex) {
          selectedItem = item;
          return true;
        }
        return false;
      });
    } else {
      selectedItem = list[0];
    }
  }

  return selectedItem;
}

export default class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isListHidden: true,
      selectedItem: prepopulateSelectedValue(props.list, props.selectedIndex)
    };

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { list, selectedIndex } = this.props;
    if (prevProps.list.length !== list.length) {
      this.setState({selectedItem: prepopulateSelectedValue(list, selectedIndex)});
    }
  }

  // todo Define why it staggering constantly
  mouseOverHandler() {
    const { isListHidden } = this.state;
    if (isListHidden) {
      this.setState({isListHidden: false});
    }
  }

  // todo Define why it staggering constantly
  mouseOutHandler() {
    const { isListHidden } = this.state;
    if (!isListHidden) {
      this.setState({isListHidden: true});
    }
  }

  selectItem(item) {
    const { selectItem } = this.props;
    this.setState({
      selectedItem: item
    });

    if (typeof selectItem === "function") {
      selectItem(item);
    }
  }

  get list() {
    const { list } = this.props;
    const { selectedItem } = this.state;
    if (Array.isArray(list)) {

      return list.map(item => (
        <Item
          key={item.index}
          index={item.index}
          value={item.value}
          selectItem={this.selectItem}
          selectedItem={selectedItem}
        />
      ));
    }
    return list;
  }

  render() {
    const { children, size, className } = this.props;
    const { isListHidden, selectedItem } = this.state;

    return (
      <div
        className={`ec-dropdown ${className}`}
        onMouseOverCapture={this.mouseOverHandler}
        onMouseOut={this.mouseOutHandler}
      >
        <div
          className={`ec-dropdown__handler ec-dropdown__handler--hidden-${isListHidden} ${setSize('ec-dropdown__handler', size)}`}
        >
          {children || selectedItem.value}
        </div>
        <div
          className={`ec-dropdown__list ec-dropdown__list--hidden-${isListHidden}`}
        >
          <ul className="ec-dropdownList">
            {this.list}
          </ul>
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  className: '',
  size: sizeType.MD
};