import React from 'react';
import ReactDOM from 'react-dom';
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
