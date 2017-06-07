import {IndexRedirect, Route, Router, hashHistory} from 'react-router';

import AppBase from 'components/scripts/index';
import Container from './container';
import Main from './main';
import Product from './product';

const routes = (
  <Route path="/" component={Container}>
    <IndexRedirect to="/main"/>
    <Route path="/main" component={Main}/>
    <Route path="/product" component={Product}/>
  </Route>
);


export default class extends AppBase {
  static initialState() {
    return {
      memory: {
        initialData: {
          tes: 123,
          age: 100,
          items: []
        },
        myInitial: 0,
        sum: 0
      },
      local: {
        test: 200,
        store: 0,
        items: [
          {
            key: 1
          }
        ]
      }
    }
  }

  componentDidMount(){
    console.log('did mout!');
  }

  render() {
    return (
      <Router history={hashHistory}>
        {routes}
      </Router>
    )
  }
}
