var ctx = document.getElementById('myChart').getContext('2d');
const part1 = 'https://api.polygon.io/v1/open-close/AAPL/';
const date = new Date();
const part2 = '?adjusted=true&apiKey=Qvah3jMPjnup44rkq7SlaDMQtn77r00E';
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Apple Inc.',
        data: [],
        backgroundColor: ['white'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
async function getData() {
  //   const response = await fetch(part1 + date + part2);
  //   const data = await response.json();
  date.setDate(date.getDate() - 14);
  console.log(date.toISOString().substring(0, 10));
  for (let i = 0; i < 5; ++i) {
    if (
      date.getDay() != 1 &&
      date.getDay() != 2 &&
      date.getDay() != 0 &&
      date.getDay() != 6
    ) {
      const dateInStr = date.toISOString().substring(0, 10);
      const response = await fetch(part1 + dateInStr + part2);
      const data = await response.json();
      console.log(data.open, data.from);
      myChart.data.labels.push(data.from);
      myChart.data.datasets[0].data.push(data.open);
    } else {
      --i;
    }
    date.setDate(date.getDate() + 1);
  }

  myChart.update();
}

getData();
