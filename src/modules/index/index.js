import 'bower_components/webkit-sass-reset/dist/webkit-sass-reset.scss';
import './style';
import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';

class IndexApp extends React.Component {
  render() {
    console.log('index app 1render...',nx.hashlize());
    return (
      <div>Hello index view1!!!</div>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('index-app')
);
