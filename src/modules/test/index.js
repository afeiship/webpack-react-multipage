import React from 'react';
import ReactDOM from 'react-dom';
import 'bower_components/webkit-sass-reset/dist/webkit-sass-reset.scss';
import './style';


class IndexApp extends React.Component {
  render() {
    console.log('test view render...');
    return (
      <div>test view1</div>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('test-app')
);
