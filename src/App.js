import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dropzone from 'react-dropzone';

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

    if (window.location.search.length > 1) { this.props.route.store.reset(); }
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

  onDrop(acceptedFiles, rejectedFiles, self) {
    let reader = new FileReader();
    if (rejectedFiles.length > 0 ||
      acceptedFiles.length == 0) {
      
    } else {
      reader.readAsText(acceptedFiles[0]);
      let content;
      reader.onload = (e) => {
        content = reader.result;
        
        let contentJSON = JSON.parse(content);
        self.props.route.store.addItem(contentJSON);
        this.renderThumbs();
      }
    }
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
            <Dropzone
              className="dropzone"
              accept="application/json"
              onDrop={(a, r) => {
                this.onDrop(a, r, this);
              }}>
              <a
                className="btn"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >Import Course</a>
        </Dropzone>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
