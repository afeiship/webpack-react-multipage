import 'components/styles/index.scss';
import './style';
import 'react-virtualized/styles.css'; // only needs to be imported once

import {AutoSizer, Collection, InfiniteLoader, WindowScroller} from 'react-virtualized'

import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';
import {$config} from 'components/scripts/index';


console.log($config);

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
      <InfiniteLoader
      isRowLoaded={this.isRowLoaded.bind(this)}
      loadMoreRows={this.loadMoreRows.bind(this)}
      rowCount={rows.length}
      >
        <AutoSizer>
          {({ width,height }) => (
            <Collection
              height={height}
              width={width}
              cellCount={rows.length}
              cellSizeAndPositionGetter={this.cellSizeAndPositionGetter.bind(this)}
              cellRenderer={this.cellRenderer.bind(this)} />
          )}
        </AutoSizer>
      </InfiniteLoader>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('app')
);
