import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SyllabusThumb from './SyllabusThumb';

class TelegraphViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      syllabus: null,
      article: '' // you need to update this using React to have the content
    }
    
    // doing a POST request to http://telegraphapi.herokuapp.com with { link: the telegra.ph url }
    // will give you a useful JSON object. superagent is a useful library available to you here,
    // google the docs
    
    this.getSyllabus = this.getSyllabus.bind(this);
  }

  componentWillMount() {
    this.getSyllabus();
  }

  getSyllabus() {
    this.setState({
      syllabus: this.props.route.store.getItemsByProperty('name', atob(this.props.params.id))[0]
    });
  }

  render() {
    return (
      <div className="TelegraphViewer main">
        {
          this.state.syllabus && 
            <SyllabusThumb
              name={this.state.syllabus.name}
              units={this.state.syllabus.units}
              underline
            />
        }
        {
          this.state.article &&
          <span />
          // somehow display the article HTML
        }
      </div>
    );
  }
}

export default TelegraphViewer;
