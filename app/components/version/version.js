'use strict';

angular.module('teamWork.version', [
  'teamWork.version.interpolate-filter',
  'teamWork.version.version-directive'
])

.value('version', '0.1');
