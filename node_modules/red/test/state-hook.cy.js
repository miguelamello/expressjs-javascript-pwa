const { useSelectiveState } = require('red/state/hook');
const { state } = require('red/state');
const { mount } = require('./utils');
const assume = require('assume');

describe('red/state/hook', function () {
  describe('{ useSelectiveState }', function () {
    it('is exposed as function', function () {
      assume(useSelectiveState).is.a('function');
    });
  });
});
