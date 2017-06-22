import 'components/styles/index.scss';
import './style';
import 'react-virtualized/styles.css'; // only needs to be imported once

import {AutoSizer, Collection, InfiniteLoader} from 'react-virtualized'

import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';

class IndexApp extends React.Component {
  
  state = {
    rows: []
  };

  
  componentWillMount() {
    this.setState({
      rows: this.generateData(1,100)
    });
  }
  

  generateData(inStart,inEnd){
    let data = [];
    let start = inStart || 1;
    let end = inEnd || 20;
    for(let i = start; i<=end; i++){
      data.push({
        id: i,
        data: Math.random()
      });
    }
    return data;
  }


  cellRenderer(inItem){
    console.log(inItem);
    return (
      <div
      key={inItem.key}
      style={inItem.style}>
        {inItem.key}
      </div>
    )
  }

  cellSizeAndPositionGetter({index}){
    return {
      height:40,
      width:375,
      x: 20,
      y: 40  * index
    };
  }

  isRowLoaded({ index }){
    return !!this.state.rows[index];
  }
  
  loadMoreRows({startIndex, stopIndex}){
    return setTimeout(()=>{
      const {rows} = this.state;
      console.log(rows);
      this.setState({
        rows: rows.concat( this.generateData(startIndex,stopIndex) )
      });
    },2000);
  }

  render() {
    const {rows} = this.state;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Collection
            height={height}
            width={width}
            cellCount={rows.length}
            cellSizeAndPositionGetter={this.cellSizeAndPositionGetter.bind(this)}
            cellRenderer={this.cellRenderer.bind(this)} />
        )}
      </AutoSizer>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('app')
);
