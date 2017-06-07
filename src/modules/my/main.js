import {ChooseImages} from 'components/scripts/index';
import NxScrollMinder from 'next-scroll-minder';
import NxStore from 'next-store';
import ReactScroller from 'react-scroller';

export default class extends React.PureComponent {

  componentDidMount() {
    NxScrollMinder.attach(this.refs.scroller);
    window.demo = this;

    setTimeout(()=>{
      NxScrollMinder.scrollToRestored();
    },100);
  }


  _onClick = e => {
    location.href = "./list";
  };


  refresh(){
    const {scroller} = this.refs;
    scroller.refresh();
  }


  render() {
    return (
      <div className="my-main-view">
        <header className="header">Header</header>
        <ReactScroller ref='scroller' className="body">
          <p>Main view.</p>
          <figure>
            <img src="http://www.dcpai.cn/update/1492419763l568132719.jpg" alt=""/>
          </figure>

          <figure>
            <img src="http://www.dcpai.cn/update/1482805723l619676841.jpg" alt=""/>
          </figure>

          <figure>
            <img src="http://www.dcpai.cn/update/1477029254l873893291.jpg" alt=""/>
          </figure>

          <figure>
            <img src="http://www.dcpai.cn/update/1469025849l576785128.jpg" alt=""/>
          </figure>

          <button onClick={this._onClick}> To Produt..</button>
        </ReactScroller>
        <footer className="footer">
          footer
          <a href="#product">TO Product</a>
        </footer>
      </div>
    );
  }
}
