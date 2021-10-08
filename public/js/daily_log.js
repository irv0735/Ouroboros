const { response } = require("express");

// function executes when the daily-entry form is submitted -> api call to save the record in the database
const dailyLogFormHandler = async (event) => {
  event.preventDefault();
  
  const activityArray = Array.from(document.querySelectorAll('.activity-input:checked')).map(item => item.value);
  const entryDate = document.querySelector('#date-log').value;
  const publicFeed = document.querySelector('#public-display').checked;
  const journal = document.querySelector('#journal-log').value.trim();
  let emotion = "undetected";

  if(entryDate && journal !== null) {

    try {
      const response = await fetch('/api/daily-log', {
        method: 'POST',
        body: JSON.stringify({ entryDate, journal }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(async (data) => {
        if (activityArray != []) {
          const responseTwo = await fetch('/api/activity-log', {
            method: 'POST',
            body: JSON.stringify({ activityArray, entryDate, daily_log_id: data.id, publicFeed  }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (!responseTwo.ok) {
            alert('Failed to save activity entry');
          };
        };
        document.location.replace('/daily-log')
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      
    }
      

}
};

document.querySelector('.daily-log-form').addEventListener('submit', dailyLogFormHandler);
