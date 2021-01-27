export const fetchData = () => {
  let feeds = [];

  feeds.push({
    lineChart: getRandomDateArray(24),
  });

  feeds.push({
    userChart: getRandomArray(13),
    pageViewChart: getRandomArray(10),
    pageSessionChart: getRandomArray(11),
    averageSessionChart: getRandomArray(18),
    bounceRate: getRandomArray(12),
    newSession: getRandomArray(8),
  });

  feeds.push({
    pieChart: getRandomArray(3),
  });

  console.log(feeds);
  return feeds;
};

function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(30 + 20 * Math.random()),
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2020-09-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 60 * Math.random()),
    });
  }
  return data;
}
