import React from 'react';

import './blockWrapper.less';

export default function BlockWrapper(props) {
  const { children, isLoad } = props;

  return (
    <section className={`blockWrapper blockWrapper--isLoaded-${isLoad}`}>
      {children}
    </section>
  );
}