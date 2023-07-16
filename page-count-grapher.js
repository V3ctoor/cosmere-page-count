// Load the Google Sheets API
Sheetrock.defaults.url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkg0Q_Y88UiH1hcbr3mYwT6LHWktwnfh8TiILQkYHoTVGZdo5DuEza_K4PY8HnO2DqBnsgx-LT37hx/pubhtml";

// Query parameters
var myQuery = "select B,C FROM 'Sheet1";

// Fetch the data
Sheetrock({
  url: Sheetrock.defaults.url,
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
