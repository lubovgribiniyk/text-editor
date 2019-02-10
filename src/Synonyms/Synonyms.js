import React from 'react';
import PropTypes from 'prop-types';
import './Synonyms.css';

const Synonyms = ({ words, onReplaceWord }) => (
  <div className="synonyms">
    <h4 className="synonyms__title">Synonyms</h4>
    <p className="synonyms__subtitle">(click to replace)</p>
    <ul className="synonyms__list">
      {words.map((word, i) => (
        <li
          key={i}
          className="synonyms__list-item"
          onClick={() => onReplaceWord(word)}
        >
          {word}
        </li>
      ))}
    </ul>
  </div>
);

Synonyms.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReplaceWord: PropTypes.func.isRequired
};

export default Synonyms;
