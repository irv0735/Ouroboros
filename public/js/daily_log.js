// function executes when the daily-entry form is submitted -> api call to save the record in the database
const dailyLogFormHandler = async (event) => {
  event.preventDefault();
  
  const activityArray = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(item => item.value);
  const entryDate = document.querySelector('#date-log').value;
  const journal = document.querySelector('#journal-log').value.trim();
  let emotion = "";
  console.log(activityArray, entryDate, journal);
  // if(journal !== null) {
  //   let newFeelingInput = journal.replaceAll(" ", "%20");
  //   console.log(newFeelingInput);
  //   let feelingAPI = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + newFeelingInput
  //   emotion = fetch(feelingAPI, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "5b7389e2b1msha3f2a9a2397902ep15e923jsnca14c8f04f77",
  //       "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com"
  //     }
  //   })
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .then(function(data) {
  //     console.log(data);
  //     console.log(data.emotions_detected[0]);
  //     return data.emotions_detected[0];
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  // }
  if (entryDate && journal) {
    const response = await fetch('/api/daily-log', {
      method: 'POST',
      body: JSON.stringify({ entryDate, journal, emotion }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      alert('Failed to save log entry.');
    }; 
  };
  
  if (activityArray != []) {
      const responseTwo = await fetch('/api/activity-log', {
      method: 'POST',
      body: JSON.stringify({ activityArray, entryDate }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!responseTwo.ok) {
      alert('Failed to save activity entry');
    };
  };
  document.location.replace('/dashboard')
};

document.querySelector('.daily-log-form').addEventListener('submit', dailyLogFormHandler);
