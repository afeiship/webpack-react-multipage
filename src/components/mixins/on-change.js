import AppBase from 'components/scripts/index';

export default class {
  onChangeToLocal(inField, inEvent) {
    AppBase.$.local = {
      [inField]: inEvent.target.value
    };
  }

  onChangeToMemory(inField, inEvent) {
    AppBase.$.memory = {
      [inField]: inEvent.target.value
    };
  }
}
