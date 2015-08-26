var myAppModule = angular.module('myApp', []);

function initialize_table(table_name, db){
  db.run("CREATE TABLE "+table_name+" ("+TABLES[table_name].schema+");");

  values = TABLES[table_name].data[0].length

  qmarks = "?"
  for (var i=1; i<values; i++) {
      qmarks += ",?"
  }

  TABLES[table_name].data.forEach( function( item ){
      db.run("INSERT INTO "+table_name+" VALUES ("+qmarks+")", item);
  } );
}


myAppModule.controller('weekOneSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tables = ['Opiskelija', 'Kurssisuoritus'];

  $scope.tables.forEach(function(table) {
    initialize_table(table, db);
  });
});

/*
myAppModule.controller('weekOneSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tables = ['students', 'courses', 'participations'];

  $scope.tables.forEach( function(table){
      initialize_table(table, db);
  });
});
*/