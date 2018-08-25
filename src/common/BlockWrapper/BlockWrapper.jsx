import React from 'react';

import './blockWrapper.less';

export default function BlockWrapper(props) {
  const { children } = props;

  return (
    <div className="blockWrapper">
      {children}
    </div>
  );
}