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
    const { sum } = nx.$memory;
    return (
      <div className="blank-module">
        <header>
          <h1 className="lc-1 ">modul11</h1>
          <h2>short!!11sdsd11wewe2 - {sum}</h2>
        </header>
        <button
          className="dc-button"
          onClick={(e) => {
            nx.$memory = {
              sum: sum + 1
            };
          }}>
          TEST
        </button>
      </div>
    );
  }
}
