import 'bower_components/webkit-sass-reset/dist/webkit-sass-reset.scss';
import './style';

import {IndexRedirect, Link, Route, Router} from 'react-router';

import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';

class IndexApp extends React.Component {

  _onClick = e => {
    location.href = './route1';
  };

  render() {
    console.log('index app 1render...',nx.hashlize());
    return (
      <div>Hello index view1!!!YOUHAHA!
        <h1><button onClick={this._onClick}>Go to route1</button></h1>
      </div>
    );
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('app')
);
