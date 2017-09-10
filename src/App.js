import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SyllabusThumb from './SyllabusThumb';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSyllabusName: '',
    }

    this.renderThumbs = this.renderThumbs.bind(this);
    this.updateNewSyllabusName = this.updateNewSyllabusName.bind(this);
    this.saveNewSyllabus = this.saveNewSyllabus.bind(this);
  }

  componentWillMount() {
    this.renderThumbs();
  }

  renderThumbs() {
    const syllabi = this.props.route.store.getAll();
    const thumbs = syllabi.map((syllabus, index) => {
      return <SyllabusThumb name={syllabus.name} units={syllabus.units} key={index} />
    });

    this.setState({
      thumbs: thumbs,
    });
  }

  updateNewSyllabusName(name) {
    this.setState({
      newSyllabusName: name
    });
  }

  saveNewSyllabus() {
    this.props.route.store.addItem({
      name: this.state.newSyllabusName,
      units: [],
    });

    this.renderThumbs();
  }

  render() {
    return (
      <div className="App fadeIn">
        <div className="thumbs">
          { this.state.thumbs }
          <div className="NewSyllabus">
            <input
              type="text"
              placeholder="What do you want to self-teach?"
              onChange={e => this.updateNewSyllabusName(e.target.value)} />
            <a className="btn" onClick={this.saveNewSyllabus}>+ Add</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
