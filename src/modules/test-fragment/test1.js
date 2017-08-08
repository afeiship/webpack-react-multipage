import createFragment from 'react-addons-create-fragment';

export default class extends React.PureComponent {
  render() {
    const children = createFragment({
      0:<h1>Test title1</h1>,
      1:<h2>Test title2</h2>
    });
    return <div>{ children }</div>
  }
}
