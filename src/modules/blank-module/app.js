import React from 'react';

import {ReduxAppBase} from 'next-react-redux';

export default class extends ReduxAppBase {
  componentDidMount() {
    console.log(ReduxAppBase.memory());
  }

  static initialState() {
    return {
      memory: {
        initialData: {
          tes: 123,
          age: 100,
          items: []
        },
        myInitial: 0,
        sum: 0
      },
      local:{
        test:200,
        store:0,
        items:[
          {key:1}
        ]
      },
      session:{
        afei:'session test..'
      }
    }
  }

  _onClick() {
    const {actions} = ReduxAppBase;
    let {test} = ReduxAppBase.local(['test']);
    test++;
    actions.local({test: test})
  }

  render() {
    const {test} = ReduxAppBase.local(['test']);
    return (
      <div className="blank-module-view">
        member-list.1212...{test}

        <button className="dc-button" onClick={this._onClick.bind(this)}>TEST</button>
      </div>
    );
  }
}
