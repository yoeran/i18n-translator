angular.module('nwApp').filter('editedFilter', function() {
  return function(input) {
    return (input === true) ? ' (edited)' : '';
  };
});
