import React from 'react';
import ReactDOM from 'react-dom';
import 'bower_components/webkit-sass-reset/dist/webkit-sass-reset.scss';
import './style';

class IndexApp extends React.Component {
  render() {
    console.log('index app render...');
    return (
      <div>Hello index view1</div>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('index-app')
);
