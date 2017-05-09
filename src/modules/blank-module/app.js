import AppBase,{TestComp} from 'components/scripts/index';

import React from 'react';
import {ReduxAppBase} from 'next-react-redux';
import autobind from 'autobind-decorator';

export default class extends AppBase {
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

  @autobind
  _onClick() {
    let {test} = AppBase.$.local;
    test++;
    AppBase.$.local={test:test};
  }

  render() {
    const {test} = AppBase.$.local;
    return (
      <div className="blank-module-view">
        member-list.1212...{test}
        <TestComp></TestComp>
        <button className="dc-button" onClick={this._onClick}>TEST</button>
      </div>
    );
  }
}
