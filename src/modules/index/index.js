import 'components/styles/index.scss';
import './style';

import {IndexRedirect, Link, Route, Router} from 'react-router';

import React from 'react';
import ReactDOM from 'react-dom';
import snipImg from 'images/Snip20170830_1.png';

// nx.import(['hashlize']);


class IndexApp extends React.Component {

  _onClick = e => {
    location.href = './route1';
  };

  render() {
    console.log('index app render...');
    return (
      <div>Hello index view1!!!YOUHAHA!
        <p><img src={snipImg} alt=""/></p>
        <h1><button onClick={this._onClick}>Go to route1</button></h1>
      </div>
    );
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('app')
);
