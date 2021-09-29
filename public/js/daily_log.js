// function executes when the daily-entry form is submitted -> api call to save the record in the database
const activityArray = document.querySelectorAll('.activity-input');

const dailyLogFormHandler = async (event) => {
  event.preventDefault();

  const entryDate = document.querySelector('#date-log').value;
  const journal = document.querySelector('#journal-log').value.trim();

  if (entryDate && journal) {
    const response = await fetch('/api/users/daily-entry', {
      method: 'POST',
      body: JSON.stringify({ entryDate, journal }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to save log entry.');
    }
  }  
};

document.querySelector('.daily-log-form').addEventListener('submit', dailyLogFormHandler);