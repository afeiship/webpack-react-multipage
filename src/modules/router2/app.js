import AppBase,{TestComp} from 'components/scripts/index';
import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import About from './about';
import Home from './home';
import React from 'react';
import {ReduxAppBase} from 'next-react-redux';
import Topics from './topics';
import autobind from 'autobind-decorator';

export default class extends AppBase {
  static initialState() {
    return {
      memory: {
        initialData: {
          tes: 123,
          age: 100,
          items: []
        }
      }
    }
  }

  @autobind
  _onClick() {
    let {test} = AppBase.$.local;
    test++;
    AppBase.$.local={test:test};
  }

  render() {
    const {test} = AppBase.$.local;
    return (
      <Router className="root-route" forceRefresh={false} getUserConfirmation={window.confirm}>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
    );
  }
}
