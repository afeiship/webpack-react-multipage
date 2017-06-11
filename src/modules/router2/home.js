export default class extends React.PureComponent {
  componentWillMount(){
    console.log('home will mout!');
  }
  
  render() {
    return (
      <div className="router2-home">
        home
      </div>
    );
  }
}
