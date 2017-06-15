import {IndexRedirect, Route, Router, createMemoryHistory} from 'react-router';

import AppBase from 'components/scripts/index';
import Container from './container';
import Detail from './detail';
import Main from './main';
import Product from './product';

const history = createMemoryHistory(location);
const routes = (
  <Route path="/" component={Container}>
    <IndexRedirect to="/main"/>
    <Route path="/main" component={Main}/>
    <Route path="/product" component={Product}/>
    <Route path="/detail" component={Detail}/>
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

  componentWillMount(){
    window.onpopstate=function(){
      alert(3);
      console.log('popstate..');
    };
  }

  componentDidMount(){
    window.history.pushState({},document.title,'?abc')
  }

  render() {
    return (
      <Router history={history}>
        {routes}
      </Router>
    )
  }
}
