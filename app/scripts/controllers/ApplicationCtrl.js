angular.module('nwApp').controller('ApplicationCtrl', ['$scope', function($scope){

  $scope.projectDirectory = false;
  $scope.selectedYaml     = false;
  $scope.yamlDocument     = false;
  $scope.isDirty          = false;
  $scope.emptyFields      = 0;

  $scope.$watch('yamlDocument', function(newVal, oldVal){
    if ( newVal !== false ) {
      var empty = 0;
      _.each(newVal.data, function(d){
        empty += _.filter(d, function(dv){ return (dv==''); }).length;
      });

      $scope.emptyFields = empty;
    }

    if ( newVal === false || oldVal === false ) { return; }
    $scope.isDirty = true;
  }, true);

  //TODO: add $watch on selectedYaml instead of ng-change on select

  function confirmChange() {
    if ( $scope.isDirty === true ) {
      if ( !window.confirm('Are you sure you want to open a new file? Changes to the current file will be lost.') ) {
        return false;
      }

      $scope.isDirty = false;
      return true;
    }

    return true;
  }

  $scope.loadYaml = function () {
    if ( !confirmChange() ) { return; }

    var files = _.filter($scope.yamlIndex, function(d){
      return ( d.id === $scope.selectedYaml );
    });

    $scope.yamlDocument = {
      files: files,
      data: window.core.buildYamlDocument( files )
    };
  };

  $scope.changeDirectory = function (dir) {
    if ( !dir ) { return; }
    if ( !confirmChange() ) { return; }

    // Build index of YAML files
    $scope.$apply(function(){
      $scope.projectDirectory = dir;
      $scope.yamlIndex        = window.core.buildYamlIndex( dir );
    });
  };

  $scope.saveWork = function () {
    $scope.isDirty = false;
    window.core.saveYaml( $scope.yamlDocument );
  };


}]);
