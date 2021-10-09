let activityArray = document.querySelectorAll('.activity-name')
const innerNumbersArray = document.querySelectorAll('#number');
const circleArray = document.querySelectorAll('circle');
const imgArray = document.querySelectorAll('.activity-img');
let activityIdArray = [];
activityArray.forEach(element => {
  activityIdArray.push(element.dataset.activityid);
})

let percentageArray = [];
const getPercentage = new Promise((resolve, reject) => {
  activityIdArray.forEach( async (element, i) => {
    const response = await fetch(`/api/activity-log/activity-count/${element}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      percentageArray.push(data*10)
      if (i === activityIdArray.length-1) resolve();
    });
  });
}).then(() => {
  innerNumbersArray.forEach((element, i) => {
    let counter = 0;
    let percentage = 0;
    if (percentageArray[i] < 100) {
      percentage = percentageArray[i];
    } else {percentage = 100;}
  circleArray.forEach((element, i) => {
    element.classList.add(`anim-${percentage}`);
  });
  imgArray.forEach((element, i) => {
    element.setAttribute("style",`opacity: ${percentage}%`)
  });    
  setInterval(() => {
    if (counter == percentage) {
      clearInterval();
    } else {
      counter += 1;
      element.innerHTML = counter + '%';
    }
  }, 20);
  });
})

const randomQuoteDiv = document.getElementById('quoteDiv');
fetch('https://type.fit/api/quotes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let randomQuote = Math.floor(Math.random() * data.length);
    let randomText = data[randomQuote].text;
    let randomAuthor = data[randomQuote].author;
    randomQuoteDiv.innerHTML = `"${randomText}" - ${randomAuthor}`;
  });


