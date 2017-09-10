import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import superagent from 'superagent'

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


    this.url = `http://telegra.ph/${this.props.params.slug}`

  }

  componentWillMount() {
    this.getSyllabus();
    this.apiRequest();
  }

  getSyllabus() {
    this.setState({
      syllabus: this.props.route.store.getItemsByProperty('name', atob(this.props.params.id))[0]
    });
  }

  apiRequest() {
      superagent.post('http://telegraphapi.herokuapp.com')
        .send({link:this.url})
        .end((error, ass)=>{
            this.setState({
                article: ass.body
            })
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
          // somehow display the article HTML
          <div className='articleFormat fadeIn' >
            <h3>{this.state.article.title}</h3>
            <div dangerouslySetInnerHTML={{__html:this.state.article.content}}/>
          </div>
        }
      </div>
    );
  }
}

export default TelegraphViewer;
