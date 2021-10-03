var ctx = document.getElementById('myChart').getContext('2d');
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&';
const key = 'CXQ1AQ6NSVPJB3D0';
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
const companies = ['AMZN', 'MSFT', 'FB', 'AAPL', 'TSLA'];

async function getData(stockSymbol) {
  const response = await fetch(
    url + 'symbol=' + stockSymbol + '&apikey=' + key
  );
  const data = await response.json();
  const name = data['Meta Data']['2. Symbol'];
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  myChart.data.datasets.push({
    label: name,
    data: [],
    backgroundColor: color,
    borderColor: color,
    borderWidth: 3,
  });
  const lastInd = myChart.data.datasets.length - 1;

  let currDate = new Date();
  currDate.setDate(currDate.getDate() - 10);
  for (let i = 0; i < 7; ++i) {
    if (currDate.getDay() != 0 && currDate.getDay() != 6) {
      const dateInStr = currDate.toISOString().substring(0, 10);
      const price = data['Time Series (Daily)'][dateInStr]['1. open'];
      myChart.data.datasets[lastInd].data.push(price);
      if (lastInd == 0) myChart.data.labels.push(dateInStr);
    } else {
      --i;
    }
    currDate.setDate(currDate.getDate() + 1);
  }
}

async function genData() {
  for (let i = 0; i < companies.length; ++i) {
    await getData(companies[i]);
  }
  myChart.update();
}

genData();
