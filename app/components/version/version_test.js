'use strict';

describe('teamWork.version module', function() {
  beforeEach(module('teamWork.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
