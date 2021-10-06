// function executes when the daily-entry form is submitted -> api call to save the record in the database
const dailyLogFormHandler = async (event) => {
  event.preventDefault();
  
  const activityArray = Array.from(document.querySelectorAll('.activity-input:checked')).map(item => item.value);
  const entryDate = document.querySelector('#date-log').value;
  const publicFeed = document.querySelector('#public-display').checked;
  const journal = document.querySelector('#journal-log').value.trim();
  let emotion = "undetected";

  if(entryDate && journal !== null) {
    let newFeelingInput = journal.replaceAll(" ", "%20");
    let feelingAPI = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + newFeelingInput
    const getEmotion = new Promise((resolve, reject) => {
      fetch(feelingAPI, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5b7389e2b1msha3f2a9a2397902ep15e923jsnca14c8f04f77",
        "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com"
      }
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        if (data.emotions_detected[0]) {
          emotion = data.emotions_detected[0];
        }
        resolve();
        return;
      })
      .catch(err => {
        console.error(err);
      });
      
    }).then( async () => {
      const response = await fetch('/api/daily-log', {
        method: 'POST',
        body: JSON.stringify({ entryDate, journal, emotion }),
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
    });
  } else {
    alert('Please enter something into the journal about the day that was memorable.')
    return
  }
};

document.querySelector('.daily-log-form').addEventListener('submit', dailyLogFormHandler);
