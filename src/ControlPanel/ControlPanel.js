import React from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.css';

const ControlPanel = ({ activeElement, onStyleBtnClick }) => {
  const { isBold, isItalic, isUnderlined } = activeElement;

  return (
    <div className="control-panel">
      <div className="format-actions">
        <button
          className={'format-action bold' + (isBold ? ' active' : '')}
          type="button"
          onClick={() => onStyleBtnClick('bold')}
        >
          <b>B</b>
        </button>
        <button
          className={'format-action italic' + (isItalic ? ' active' : '')}
          type="button"
          onClick={() => onStyleBtnClick('italic')}
        >
          <i>I</i>
        </button>
        <button
          className={
            'format-action underline' + (isUnderlined ? ' active' : '')
          }
          type="button"
          onClick={() => onStyleBtnClick('underline')}
        >
          <u>U</u>
        </button>
      </div>
    </div>
  );
};

ControlPanel.defaultProps = {
  activeElement: {}
};

ControlPanel.propTypes = {
  activeElement: PropTypes.object,
  onStyleBtnClick: PropTypes.func.isRequired
};

export default ControlPanel;
