import React from 'react';

import { FaAngleDoubleUp } from 'react-icons/fa';

import './ecFooter.less';

export default function EcFooter({ contentRef }) {
  const scrollToStart = () => {
    if (window && contentRef && contentRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="ecFooter">
      <div className="ecFooter__prevBtn">
        <div className="ecFooterPrevBtn" onClick={scrollToStart}>
          <FaAngleDoubleUp/>
        </div>
      </div>
    </footer>
  );
}