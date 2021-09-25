const dailyLogFormHandler = async (event) => {
  event.preventDefault();

  const entryDate = document.querySelector('#date-log').value;
  const journal = document.querySelector('#journal-log').value.trim();

  if (entryDate && journal) {
    const response = await fetch('/api/users/daily-log', {
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

document.querySelector('.daily-log-form').addEventListener('submit', dailyLogFormHandler);git 