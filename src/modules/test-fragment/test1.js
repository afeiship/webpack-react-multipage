import createFragment from 'react-addons-create-fragment';

export default class extends React.PureComponent {
  render() {
    const children = createFragment({
      'h1':<h1>Test title1</h1>,
      'h2':<h2>Test title2</h2>
    });
    return <div>{ children }</div>
  }
}
