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

  _onClick = e => {
    let {test} = AppBase.$.local;
    test++;
    AppBase.$.local={test:test};
  }

  _onClick2 = e => {
    //location.replace('./index');
    // history.back();
    window.history.go(-2);
  };


  render() {
    const {test} = AppBase.$.local;
    return (
      <div className="blank-module-view">
        member-list.1212...{test}
        <button onClick={this._onClick2}>GoTo Index...</button>
        <button className="dc-button" onClick={this._onClick}>TEST</button>
      </div>
    );
  }
}
