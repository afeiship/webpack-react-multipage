import 'components/styles/index.scss';
import './style';
import 'react-virtualized/styles.css'; // only needs to be imported once

import React from 'react';
import ReactDOM from 'react-dom';
import VirtualList from 'react-tiny-virtual-list';
import nx from 'next-js-core2';

class IndexApp extends React.Component {

  state = {
    rows: []
  };


  componentWillMount() {
    this.setState({
      rows: this.generateData(1,20)
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

  loadMoreRows(inCount){
    const count = inCount || 20;
    return setTimeout(()=>{
      const {rows} = this.state;
      this.setState({
        rows: rows.concat( this.generateData(1, count) )
      },()=>{
        this.setState({loading:false})
      });
    },2000);
  }


  _renderItem(inItem){
    const {index,style} = inItem;
    return (
      <div key={index} style={style}>
        <figure>
            <img src="http://placeholder.qiniudn.com/375x200" alt=""/>
            <figurecaption>Letter: {inItem[index]}, Row: #{index}</figurecaption>
        </figure>
      </div>
    );
  }


  get scrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  get wrapperBound(){
    return {
      bottom: document.documentElement.clientHeight
    };
  }

  get scrollerBound(){
    const listDom = document.querySelector('.virtual-list>div');
    return listDom.getBoundingClientRect();
  }

  checkBounds(){
    if(!this.loading){
      const wrapperBound = this.wrapperBound;
      const scrollerBound = this.scrollerBound;
      if (scrollerBound.bottom - wrapperBound.bottom < 100) {
        //console.log('active!!!');
        this.setState({loading:true});
        this.loadMoreRows();
      }
    }
  }

  _onScroll(inEvent){
    this.checkBounds();
  }

  render() {
    const {rows,loading} = this.state;
    return (
      <div className="container">
        <VirtualList
          className='virtual-list'
          width='100%'
          height='100%'
          onScroll={this._onScroll.bind(this)}
          itemCount={rows.length}
          itemSize={220} // Also supports variable heights (array or function getter)
          renderItem={this._renderItem.bind(this)}
        />
        {loading && <div className="load-more">loading...</div>}
      </div>
    )
  }
}

ReactDOM.render(
    <IndexApp />,
    document.getElementById('app')
);
