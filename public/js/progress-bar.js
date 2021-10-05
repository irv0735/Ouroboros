var randomQuoteDiv = document.getElementById('quoteDiv');
var refreshButton = document.getElementById('refresh')

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const quote = JSON.stringify(data);
    for (let i = 0; i < quote.length; i++) {
      const quoteSingular = quote[i];
      randomQuoteDiv.innerHTML = quoteSingular;
      
    }
    let randomQuote = quotei[Math.floor(Math.random()*quotei.length)]
    
  });




refreshButton.addEventListener('click',  function() {
   randomPoem();
}
);






const suggestionDiv = document.getElementById('suggestion-content');
//fetch ('/activity-log/activity-count/:id') multiple count by 10 and have their total points 

//create a new fetch for unicrons 


const { response } = require("express");

  const innerNumbers = document.querySelectorAll('#number');

  innerNumbers.forEach(element => {
    let counter = 0;
    let percentage = element.closest('.progress').dataset.percent;
    setInterval( () => {
      if (counter == percentage) {
        clearInterval();
      } else {
        counter += 1;
        element.innerHTML = counter + '%';
      }
    }, 20)
 //random after removing elements form the array 
 //make new 
    if (element< 50) {

      //which case is equal to this 
      // switch (suggestion) {
      //   case creative:
      //     const creativeDiv = document.innerHTML.suggestionDiv =  + " your world might not feel very colorful today may we suggest doing something creative?"
      //     "Maybe write in a journal, create an en plein air painting or go to the museum.";
      //     break;
      //   case movement:
      //     day = "Monday";
      //     break;
       
      // }

            
      const movementDiv = document.innerHTML.suggestionDiv = "Movement and exercise is said to  "

    }
  });




