var request = new XMLHttpRequest();  
request.open("GET", 'classicle_data.csv', false);   
request.send(null);  

var csv_data = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
  csv_data.push(jsonObject[i].split(','));
}

let day = 2;
let pieces = [];
for (var i = 1; i < csv_data.length; i++) {
  pieces.push(csv_data[i][0]);
}

let correct_data = csv_data[day];
let correct_name = csv_data[day][0];
let link = csv_data[day][1];


for (var i = 4; i < 10; i++) {
  correct_data[i] = correct_data[i].split(' ');
  for (var j = 0; j < correct_data[i].length; j++) {
    correct_data[i][j] = correct_data[i][j].split(':');
  }
}
