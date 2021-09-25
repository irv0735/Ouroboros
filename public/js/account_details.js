const settingsFormHandler = async (event) => {
  event.preventDefault();

  const bio = document.querySelector('#bio-settings').value.trim();
  const goals = document.querySelector('#goals-settings').value.trim();

  if (bio && goals) {
    const response = await fetch('/api/users/settings', {
      method: 'POST',
      body: JSON.stringify({ bio, goals }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create account.');
    }
  }
};

document.querySelector('.settings-form').addEventListener('submit', settingsFormHandler);