// const suggestionDiv = document.getElementById('suggestion-content');
//fetch ('/activity-log/activity-count/:id') multiple count by 10 and have their total points

var randomQuoteDiv = document.getElementById('quoteDiv');

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

const innerNumbers = document.querySelectorAll('#number');

innerNumbers.forEach((element) => {
  let counter = 0;
  let percentage = element.closest('.progress').dataset.percent;
  setInterval(() => {
    if (counter == percentage) {
      clearInterval();
    } else {
      counter += 1;
      element.innerHTML = counter + '%';
    }
  }, 20);

});
