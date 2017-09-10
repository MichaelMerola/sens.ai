import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Link,
} from 'react-router';

import SyllabusThumb from './SyllabusThumb';

class Syllabus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      syllabus: null,
    };

    this.getSyllabus = this.getSyllabus.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  componentWillMount() {
    this.getSyllabus();
  }

  getSyllabus() {
    this.setState({
      syllabus: this.props.route.store.getItemsByProperty('name', atob(this.props.params.id))[0]
    });
  }

  toggleCompletion(unitToToggle) {
    const syllabus = this.state.syllabus;
    let indexToModify;

    syllabus.units.forEach((unit,index) => {
      if (unit.title === unitToToggle) {
        indexToModify = index;
      }
    });

    syllabus.units[indexToModify].complete = !syllabus.units[indexToModify].complete;
    console.log(syllabus);
    this.props.route.store.setItemByProperty('name', atob(this.props.params.id), syllabus);
    this.getSyllabus();    
  }

  render() {
    return (
      <div className="Syllabus main">
        {
          this.state.syllabus && 
            <SyllabusThumb
              name={this.state.syllabus.name}
              units={this.state.syllabus.units}
              underline
            />
        }
        <ul className="units fadeIn">
        {
          this.state.syllabus.units.map(unit => {
            return (<li>
              <h2>
                <span>{unit.title}</span>
                <input
                  type="checkbox"
                  checked={unit.complete ? 'checked' : false}
                  data-title={unit.title}
                  onChange={e => { this.toggleCompletion(e.target.dataset.title) }}
                />
              </h2>
              <ul className="resources"> 
                {
                  unit.resources.map(a => {
                    if (a.isTelegram) {
                      return <li className="ion-ios-paper-outline"><Link target="_blank" to={a.url}>{a.name}</Link></li>;
                    }
                    return <li className="ion-link"><a target="_blank" href={a.url}>{a.name}</a></li>;
                  })
                }
              </ul>
            </li>)
          })
        }
        </ul>
        <div className="buttons fadeIn">
          <Link className="btn" to={`/syllabus/${this.props.params.id}/new`}>+ Add Unit</Link>
          <a href="#" className="btn">Export Syllabus</a>
        </div>
      </div>
    );
  }
}

export default Syllabus;
