import React from 'react';
import PropTypes from 'prop-types';

const TextElement = ({ elementInfo, onSelect, children }) => {
  const { isBold, isUnderlined, isItalic } = elementInfo;
  const styles = {};

  if (isBold) {
    styles.fontWeight = 'bold';
  }
  if (isUnderlined) {
    styles.textDecoration = 'underline';
  }
  if (isItalic) {
    styles.fontStyle = 'italic';
  }

  return (
    <span style={styles} onDoubleClick={onSelect}>
      {children}
    </span>
  );
};

TextElement.propTypes = {
  elementInfo: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default TextElement;
