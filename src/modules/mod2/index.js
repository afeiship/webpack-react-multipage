import { ReduxAppBase, ReduxBoot, reduxRender } from '@feizheng/next-react-redux';

@reduxRender('app', { prefix: 'react-mpa' })
export default class extends ReduxAppBase {
  static initialState(inStore) {
    const { login } = inStore.local;
    return {
      local: {
        login: login || null
      },
      memory: {
        sum: 100,
        a: {
          b: {
            c: 123
          }
        }
      }
    };
  }

  componentDidMount() {
    nx.$global = { 'abc.test': 123 };
  }

  eventBus(inName, inData) {
    console.log('*, I am - global event bus center:->', inName, inData);
  }

  render() {
    const c = nx.get(nx.$memory, 'a.b.c');
    return (
      <div className="blank-module">
        <header>
          <h1 className="lc-1 ">I am from module2</h1>
        </header>
        <button
          className="dc-button"
          onClick={(e) => {
            nx.$memory = {
              'a.b.c': c + 1
            };
          }}>
          TEST
        </button>
      </div>
    );
  }
}
