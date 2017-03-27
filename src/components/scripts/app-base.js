import React from 'react';
import {ReduxAppBase} from 'next-react-redux';
import Api from '../services/api';

export default class extends ReduxAppBase {
  constructor(props) {
    super(props);

    //provide http api:
    this.$api = Api;
  }
}
