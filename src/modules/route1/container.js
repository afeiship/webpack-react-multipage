import {IndexRedirect, Link, Route, Router} from 'react-router';
export default class extends React.Component {
  render() {
    return (
      <div className="container">
        <nav>
          <li>
            <Link to="/main">Main</Link>
          </li>

          <li>
            <Link to="/product">Product</Link>
          </li>

          <li>
            <Link to="/detail">Detail</Link>
          </li>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
