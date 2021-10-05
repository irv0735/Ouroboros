// const suggestionDiv = document.getElementById('suggestion-content');
//fetch ('/activity-log/activity-count/:id') multiple count by 10 and have their total points

// const { response } = require("express");
var randomQuoteDiv = document.getElementById('quoteDiv');
var refreshButton = document.getElementById('refresh');
fetch('https://type.fit/api/quotes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data[0]);
    // let quote = JSON.stringify(data);
    let randomQuote = Math.floor(Math.random() * data.length);
    let randomText = data[randomQuote].text;
    let randomAuthor = data[randomQuote].author;
    console.log(randomText);
    console.log(randomAuthor);
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

  // if (element< 50) {
  //   const creativeDiv = document.innerHTML.suggestionDiv =  + " your world might not feel very colorful today may we suggest doing something creative?"
  //             "Maybe write in a journal, create an en plein air painting or go to the museum."

  //             const movementDiv = document.innerHTML.suggestionDiv = "GET YA ASS UP "

  // }
});
