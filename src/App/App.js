import React, { Component } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { getMockText } from '../text.service';
import '../App/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    this.fetchText();
  }

  fetchText() {
    getMockText().then(textFile => {
      this.setState({
        text: textFile
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          {this.state.text ? (
            <TextEditor initialText={this.state.text} />
          ) : (
            'Loading...'
          )}
        </main>
      </div>
    );
  }
}

export default App;
