angular.module('nwApp').directive('textGroup', function() {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },
    transclude: true,
    template: '<div ng-include="contentUrl()"></div>',
    link: function(scope) {
      scope.contentUrl = function () {
        return ( typeof scope.data === 'object' ) ? 'text-group.html' : 'text-node.html';
      };

      scope.transformTitle = function (title) {
        title = title.split('.');
        var l = title.pop();
        l = '<span>'+l+'</span>';
        title.push(l);
        return title.join('.');
      };
    }
  }
});
