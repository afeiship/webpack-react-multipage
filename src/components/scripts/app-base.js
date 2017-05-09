import React from 'react';
import {ReduxAppBase} from 'next-react-redux';

export default class AppBase extends ReduxAppBase {
  constructor(props) {
    super(props);

    nx.mix(AppBase, {
      $: props.$,
      $hash: nx.hashlize()
    });

    //fastclick:
    // FastClick.attach(document.body);
  }
}
