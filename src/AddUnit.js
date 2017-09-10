import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  browserHistory
} from 'react-router';

import SyllabusThumb from './SyllabusThumb';

class AddUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      syllabus: null,
      resources: [],
      resourceOnDeck: {},
      titleOnDeck: '',
    };

    this.getSyllabus = this.getSyllabus.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateResourceName = this.updateResourceName.bind(this);
    this.updateURL = this.updateURL.bind(this);
    this.addResource = this.addResource.bind(this);
    this.addUnit = this.addUnit.bind(this);
  }

  componentWillMount() {
    this.getSyllabus();
  }

  getSyllabus() {
    this.setState({
      syllabus: this.props.route.store.getItemsByProperty('name', atob(this.props.params.id))[0]
    });
  }

  updateTitle(title) {
    this.setState({
      titleOnDeck: title
    });
  }

  updateResourceName(name) {
    const nu = this.state.resourceOnDeck;
    nu.name = name;
    this.setState({
      resourceOnDeck: nu
    });
  }

  updateURL(url) {
    const nu = this.state.resourceOnDeck;
    nu.url = url;
    this.setState({
      resourceOnDeck: nu
    });
  }

  addResource() {
    const rsrcs = this.state.resources;
    const telegraphRegexp = new RegExp(/http:\/\/telegra.ph\//g);

    let resourceOnDeck = this.state.resourceOnDeck;

    if (telegraphRegexp.test(this.state.resourceOnDeck.url)) {
      resourceOnDeck.isTelegram = true;
      resourceOnDeck.url = `/syllabus/${this.props.params.id}/${resourceOnDeck.url.split('ph/')[1]}`;
    }

    rsrcs.push(this.state.resourceOnDeck);
    this.setState({
      resources: rsrcs,
      resourceOnDeck: { name: '', url: '' }
    });
  }

  addUnit() {
    const syllabus = this.props.route.store.getItemsByProperty('name', atob(this.props.params.id))[0];
    if (!syllabus.units) { syllabus.units = [] }
    syllabus.units.push({
      title: this.state.titleOnDeck,
      resources: this.state.resources,
      complete: false,
    });

    this.props.route.store.setItemByProperty('name', atob(this.props.params.id), syllabus);

    browserHistory.push(`/syllabus/${(this.props.params.id)}`);
  }

  render() {
    const resources = this.state.resources.map(resource => {
      return <li><a href={resource.url} target="_blank">{resource.name}</a></li>
    });

    return (
      <div className="AddUnit main">
        {
          this.state.syllabus && 
            <SyllabusThumb
              name={this.state.syllabus.name}
              units={this.state.syllabus.units}
              underline
            />
        }
        <div className="add fadeIn">
          <input
            type="text"
            placeholder="Unit Title"
            className="title"
            onChange={e => this.updateTitle(e.target.value)}
          />
          <div className="resources">
            <input
              type="text"
              placeholder="Resource Name"
              className="name"
              value={this.state.resourceOnDeck.name}
              onChange={e => this.updateResourceName(e.target.value)}
            />
            <input
              type="url"
              placeholder="URL"
              className="url"
              value={this.state.resourceOnDeck.url}
              onChange={e => this.updateURL(e.target.value)}
            />
            <a className="btn" onClick={this.addResource}>+</a>
          </div>
          <ul className="resources">
            { resources }
          </ul>
          <a className="btn done" onClick={this.addUnit}>Complete</a>
        </div>
      </div>
    );
  }
}

export default AddUnit;
