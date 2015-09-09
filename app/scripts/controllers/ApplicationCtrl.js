angular.module('nwApp').controller('ApplicationCtrl', ['$scope', function($scope){

  $scope.projectDirectory = false;
  $scope.localeFiles      = [];
  $scope.selectedYaml     = false;
  $scope.yamlDocument     = false;

  $scope.loadYaml = function () {
    //TODO: Confirm change if dirty
    var files = _.filter($scope.yamlIndex, function(d){
      return ( d.id === $scope.selectedYaml );
    });

    $scope.yamlDocument = window.core.buildYamlDocument( files );
  };

  $scope.changeDirectory = function (dir) {
    if( !dir ){ return; }

    // Build index of YAML files
    $scope.$apply(function(){
      $scope.projectDirectory = dir;
      $scope.yamlIndex = window.core.buildYamlIndex( dir );
    });
  };


}]);
