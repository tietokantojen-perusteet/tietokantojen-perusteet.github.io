var myAppModule = angular.module('myApp');

myAppModule.directive('togglable', function() {
  return {
      restrict: 'E',
      scope: {
        content: '@'
      },
      transclude: true,
      templateUrl: 'templates/togglable-template.html',
      controller: function($scope){
        $scope.visible = false;
        $scope.command = "näytä";
        $scope.toggle = function () {
          $scope.visible = !$scope.visible;
          $scope.command = $scope.visible ? "piilota" : "näytä";
        }
      }
  };
});

myAppModule.directive('tableInfo', function() {
  return {
      restrict: 'E',
      templateUrl: 'templates/table-template.html',
      controller: function($scope){
        $scope.table_details = function (table_name) {
            return TABLES[table_name].schema;
        }
      }
  };
});

myAppModule.directive('query', function() {
  return {
      restrict: 'E',
      templateUrl: 'templates/query-template.html',
      scope: {
          db: '=',
          query: '@',
          editable: '@',
          done: '='
      },
      controller: function($scope){
          $scope.run_query = function(query) {
              try {
                  $scope.error = null

                  var stmt = $scope.db.prepare(query);

                  stmt.getAsObject();

                  stmt.bind();

                  $scope.rows = [];
                  while(stmt.step()) {
                      var row = stmt.getAsObject();
                      $scope.rows.push(row);
                  }
                  $scope.columns = Object.keys($scope.rows[0]);
                  $scope.done = true
              }
              catch(err) {
                  $scope.error = err.toString();
              }

          };

          $scope.clear = function () {
              $scope.rows = null;
              $scope.columns = null;
          };
      }
  };
});