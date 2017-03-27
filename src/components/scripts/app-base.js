import React from 'react';
import {ReduxAppBase} from 'next-react-redux';
import Api from '../services/api';
import App from '../services/app';

export default class extends ReduxAppBase {
  constructor(props) {

    super(props);

    //provide http api/app:
    this.$api = Api;
    this.$app = App;
    this.$memory = ReduxAppBase.memory;
    this.$request = ReduxAppBase.request;
    this.$root = ReduxAppBase.root;
    this.$local = ReduxAppBase.local;
    this.$session = ReduxAppBase.session;
    this.$actions = ReduxAppBase.actions;

    // console.log(this);
  }
}
