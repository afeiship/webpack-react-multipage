export default class extends React.PureComponent {

  _onClick = e => {
    location.replace('./blank-module');
  };

  render() {
    return (
      <div className="my-detail-view">
        <button onClick={this._onClick}>GoTo blank-modue</button>
        My detila view.
      </div>
    );
  }
}
