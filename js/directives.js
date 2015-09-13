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
            return $scope.tabledata[table_name].schema;
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
          done: '=?',
	  valid: '@?'
      },
      controller: function($scope) {
          $scope.run_query = function(query) {
              try {
		  console.log("Running query " + query);
		  $scope.done = false;
		  $scope.validMessage = null;
                  $scope.error = null;

		  if(!query || query.length == 0) {
		      $scope.error = "Annettiin tyhjä kysely -- ei suoritettavaa.";
		      return;
		  }

		  if (query.toUpperCase().indexOf("DELETE") > -1 || 
		      query.toUpperCase().indexOf("INSERT") > -1) {
		      $scope.db.run(query);

		      if(!$scope.valid) {
			  $scope.done = true;
		      } else {
			  console.log("TODO: validate update");
		      }
		      

		      return;		      
		  }

                  var stmt = $scope.db.prepare(query);

                  stmt.getAsObject();

                  stmt.bind();

                  $scope.rows = [];
                  
		  while(stmt.step()) {
                      var row = stmt.getAsObject();
                      $scope.rows.push(row);
                  }
                  
		  $scope.columns = Object.keys($scope.rows[0]);
		  
		  if(!$scope.valid) {
                      $scope.done = true
		  } else {
		      console.log("Validating against result " + query);
      		      var testStmt = $scope.db.prepare($scope.valid);
                      testStmt.getAsObject();
                      testStmt.bind();
		      
		      var testRows = [];
                      
		      while(testStmt.step()) {
			  var row = testStmt.getAsObject();
			  testRows.push(row);
                      }

		      var testColumns = Object.keys(testRows[0]);

		      // test cases
		      // 1. onko sarakkeiden lukumäärä toivottu
		      console.log("Test case 1");
		      if(testColumns.length != $scope.columns.length) {
			  $scope.validMessage = [];
			  $scope.validMessage.push("Kyselyn vastauksessa tulisi olla " + testColumns.length + " saraketta, mutta nyt niitä oli " + $scope.columns.length);
			  return;
		      }

		      console.log("Test case 2");
		      // 2. ovatko sarakkeet nimetty toivotulla tavalla
		      for (var i = 0; i < testColumns.length; i++) {
			  if(testColumns[i].valueOf() == $scope.columns[i].valueOf()) {
			      continue;
			  }

			  $scope.validMessage = [];
			  $scope.validMessage.push("Sarakkeen " + (i + 1) + " pitäisi olla " + testColumns[i] + ", mutta nyt se oli " + $scope.columns[i]);
			  return;
		      }
		      
		      console.log("Test case 3");
 		      // 3. onko rivien lukumäärä toivottu
		      if(testRows.length != $scope.rows.length) {
			  $scope.validMessage = [];
			  $scope.validMessage.push("Kyselyn vastauksessa tulisi olla " + testRows.length + " riviä, mutta nyt niitä oli " + $scope.rows.length);
			  return;
		      }

		      // 4. ovatko rivit järjestyksessä
		      // TODO: myöh

		      console.log("Test case 5");
		      testRows.length != $scope.rows.length
		      // 5. onko n:s datarivi ok
		      for (var i = 1; i < testRows.length; i++) {
			  for (var j = 0; j < testColumns.length; j++) {
			      if(testRows[i][testColumns[j]].valueOf() == $scope.rows[i][testColumns[j]].valueOf()) {
				  continue;
			      }

			      $scope.validMessage = [];
			      $scope.validMessage.push("Virhe vastauksen rivillä " + i + ". Odotettiin, että arvot olisivat seuraavat:");

			      for (var k = 0; k < testColumns.length; k++) {
				  $scope.validMessage.push("  " + testColumns[k] + ": " + testRows[i][testColumns[k]]);
			      }

			      return;
			  }
		      }

		      $scope.done = true;
		  } 
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