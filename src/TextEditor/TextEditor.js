import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import ControlPanel from '../ControlPanel/ControlPanel';
import FileZone from '../FileZone/FileZone';
import Synonyms from '../Synonyms/Synonyms';
import { getSynonyms, capitalize } from '../text.service';
import './TextEditor.css';

class TextEditor extends Component {
  static propTypes = {
    initialText: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      textElements: this.props.initialText.split(' ').map(value => ({
        id: shortId.generate(),
        text: value,
        isBold: false,
        isItalic: false,
        isUnderlined: false
      })),
      activeElementInd: null,
      synonyms: []
    };
  }

  handleSelect = ind => {
    this.setState({ activeElementInd: ind });

    const word = this.state.textElements[ind].text.replace(/^\W+|\W+$/g, '');
    if (word) {
      getSynonyms(word).then(synonyms => {
        this.setState({ synonyms });
      });
    }
  };

  handleActionType = (type, el) => {
    switch (type) {
      case 'bold':
        return { ...el, isBold: !el.isBold };
      case 'italic':
        return { ...el, isItalic: !el.isItalic };
      case 'underline':
        return { ...el, isUnderlined: !el.isUnderlined };
      default:
        return el;
    }
  };

  handleStyleBtnClick = actionType => {
    const { textElements, activeElementInd } = this.state;
    if (activeElementInd === null) {
      return;
    }

    const newTextElements = [...textElements];
    const targetEl = newTextElements[activeElementInd];

    newTextElements[activeElementInd] = this.handleActionType(
      actionType,
      targetEl
    );

    this.setState({
      textElements: newTextElements
    });
  };

  resetActiveElement = () => {
    this.setState({
      activeElementInd: null,
      synonyms: []
    });
  };

  handleReplaceWord = words => {
    const { textElements, activeElementInd } = this.state;
    if (activeElementInd === null) {
      return;
    }

    const newWords = words.split(' ').map(word => ({
      ...textElements[activeElementInd],
      id: shortId.generate(),
      text: word
    }));

    const prevWord = textElements[activeElementInd].text;
    if (prevWord[0] === prevWord[0].toUpperCase()) {
      newWords[0].text = capitalize(newWords[0].text);
    }

    const newTextElements = [...textElements];
    newTextElements.splice(activeElementInd, 1, ...newWords);

    this.setState({
      textElements: newTextElements,
      synonyms: [],
      activeElementInd: null
    });
  };

  render() {
    return (
      <div className="text-editor">
        <ControlPanel
          onStyleBtnClick={this.handleStyleBtnClick}
          activeElement={this.state.textElements[this.state.activeElementInd]}
        />
        <FileZone
          onResetSelection={this.resetActiveElement}
          textElements={this.state.textElements}
          onSelect={this.handleSelect}
        />
        {this.state.synonyms.length ? (
          <Synonyms
            words={this.state.synonyms}
            onReplaceWord={this.handleReplaceWord}
          />
        ) : null}
      </div>
    );
  }
}

export default TextEditor;
