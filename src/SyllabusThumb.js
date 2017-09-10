import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Link,
} from 'react-router';

import ProgressBar from './ProgressBar';

class SyllabusThumb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const link = (() => {
      if (this.props.underline) {
        return '/'
      }
      return `/syllabus/${btoa(this.props.name)}`;
    })();

    return (
      <Link className={`SyllabusThumb ${this.props.underline ? 'underline' : ''}`} to={link}>
        <h3>{this.props.name}</h3>
        <p className="grey">{this.props.units.length} units</p>
        <p className="grey">~{this.props.units.length*0.5} hours</p>
        <ProgressBar units={this.props.units} />
      </Link>
    );
  }
}

export default SyllabusThumb;
