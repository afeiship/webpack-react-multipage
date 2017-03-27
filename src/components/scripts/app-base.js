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
  }
}
