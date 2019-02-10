import React from 'react';
import PropTypes from 'prop-types';
import TextElement from '../TextElement/TextElement';
import './FileZone.css';

const FileZone = ({ onResetSelection, textElements, onSelect }) => (
  <div className="file-zone" onMouseUp={onResetSelection}>
    <div className="file">
      {textElements.map((el, i) => (
        <TextElement key={el.id} elementInfo={el} onSelect={() => onSelect(i)}>
          {el.text}{' '}
        </TextElement>
      ))}
    </div>
  </div>
);

FileZone.propTypes = {
  textElements: PropTypes.arrayOf(PropTypes.object).isRequired,
  onResetSelection: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default FileZone;
