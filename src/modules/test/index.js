import React from 'react';
import ReactDom from 'react-dom';
import './style';

class IndexApp extends React.Component {
  render() {
    console.log('render');
    return (
      <div>test view1</div>
    )
  }
}

ReactDom.render(
    <IndexApp />,
    document.getElementById('test-app')
);
