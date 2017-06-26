import 'components/styles/index.scss';
import './style';
import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';



class IndexApp extends React.Component {
  render() {
    console.log('test view render...',nx);
    return (
      <div>test view1</div>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('test-app')
);
