import React from 'react';
import autobind from 'autobind-decorator';
import {ReduxAppBase} from 'next-react-redux';
import {AppBase} from 'components/scripts/index';


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
    let {test} = this.$local(['test']);
    test++;
    this.$actions.local({test: test})
  }

  render() {
    const {test} = ReduxAppBase.local(['test']);
    return (
      <div className="blank-module-view">
        member-list.1212...{test}

        <button className="dc-button" onClick={this._onClick}>TEST</button>
      </div>
    );
  }
}
