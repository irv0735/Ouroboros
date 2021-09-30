// function executes when the daily-entry form is submitted -> api call to save the record in the database
const dailyLogFormHandler = async (event) => {
  event.preventDefault();
  
  const activityArray = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(item => item.value);
  const entryDate = document.querySelector('#date-log').value;
  const journal = document.querySelector('#journal-log').value.trim();

  if (entryDate && journal) {
    const response = await fetch('/api/users/daily-entry', {
      method: 'POST',
      body: JSON.stringify({ entryDate, journal }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      alert('Failed to save log entry.');
    }; 
  };
  
  if (activityArray != []) {
      const responseTwo = await fetch('/api/users/activity-log', {
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
