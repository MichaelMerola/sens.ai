import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import store from './configure-localStore';

import './index.css';
import App from './App';
import Syllabus from './Syllabus';
import AddUnit from './AddUnit';
import TelegraphViewer from './TelegraphViewer';
import registerServiceWorker from './registerServiceWorker';

let appStore = store(
  'savedSyllabi',
  localStorage.getItem('savedSyllabi')
);

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} store={appStore} />
    <Route path="/syllabus/:id" component={Syllabus} store={appStore} />
    <Route path="/syllabus/:id/new" component={AddUnit} store={appStore} />
    <Route path="/syllabus/:id/:slug" component={TelegraphViewer} store={appStore} />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
