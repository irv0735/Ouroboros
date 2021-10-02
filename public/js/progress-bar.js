const suggestionDiv = document.getElementById('suggestion-content');
  //fetch ('/activity-log/activity-count/:id') multiple count by 10 and have their total points 

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
    }, 20);

    if (element< 50) {
      const creativeDiv = document.innerHTML.suggestionDiv =  + " your world might not feel very colorful today may we suggest doing something creative?"
                "Maybe write in a journal, create an en plein air painting or go to the museum."
            
      const movementDiv = document.innerHTML.suggestionDiv = "Movement and exercise is said to  "

    }
  });




