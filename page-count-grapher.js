// Load the Google Sheets API
Sheetrock.defaults.url = "https://docs.google.com/spreadsheets/d/189tcf-Kk1hjrQxm7ADQMT3rvlRWtIqejAsJYoUYNlso/edit#gid=0";

// Query parameters
var myQuery = "select B,C";

// Fetch the data
Sheetrock({
  query: myQuery,
  callback: showData
});

// Callback function to create the graph with Chart.js
function showData(error, options, response) {
  if(!error) {
    var labels = [];
    var data = [];

    for(let i=0; i<response.rows.length; i++) {
      labels.push(response.rows[i].cellsArray[0]);
      data.push(response.rows[i].cellsArray[1]);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}