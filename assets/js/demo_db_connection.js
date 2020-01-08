var mysql = require('mysql');
 
var conn = mysql.createConnection({
  database: 'automation',
  host: "10.0.2.35",
  user: "Anup",
  password: "Anup"
});
 
 var result;
 
conn.connect(function(err) {
  if (err) throw err;
   conn.query("select * from automation_masterdata", function (err, result, fields) {
    if (err) throw err;
    console.log(JSON.stringify(result));
  });
});
//var result2 = JSON.stringify(new function(){ this[name] = result; }, null, '\t');
var result2;

var result =
[{"TestCaseNo":"TS05_TC01","TestType":"Smoke","ModuleName":"PlannningBoard","TestCaseName":"AddActivityType","BuildStatus":"Complete"},{"TestCaseNo":"TS05_TC02","TestType":"Smoke","ModuleName":"PlannningBoard","TestCaseName":"AddPlanningBoard","BuildStatus":"Complete"}];

// Builds the HTML Table out of TestList.
function buildHtmlTable(selector) {
  var columns = addAllColumnHeaders(result, selector);

  for (var i = 0; i < result.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = result[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(result, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < result.length; i++) {
    var rowHash = result[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
