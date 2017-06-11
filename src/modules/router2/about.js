export default class extends React.PureComponent {
  componentWillMount(){
    console.log('about will mout!');
  }

  shouldComponentUpdate(){
    return true;
  }
  
  render() {
    console.log('update about!.');
    return (
      <div className="router2-about">
        About
      </div>
    );
  }
}
