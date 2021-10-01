// function executes when the account-settings form is submitted -> api call to store the settings in the DB
const settingsFormHandler = async (event) => {
  event.preventDefault();
  const bio = document.querySelector('#bio-settings').value.trim();
  const goals = document.querySelector('#goals-settings').value.trim();
  const previousData = document.querySelector('.settings-form').dataset.existing;
  if (previousData === "false") {
    if (bio && goals) {
      const response = await fetch('/api/users/settings', {
        method: 'POST',
        body: JSON.stringify({ bio, goals }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to save-settings.');
      }
    } else {
    alert("You must enter both a bio and goal to continue!");
    }
  } else {
    if (bio && goals) {
      const response = await fetch('/api/users/settings', {
        method: 'PUT',
        body: JSON.stringify({ bio, goals }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to save settings.');
      }
    } else {
    alert("You must enter both a bio and goal to continue!");
    }
  }
};

const deleteAccountHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete account. ');
  }
}

document.querySelector('.settings-form').addEventListener('submit', settingsFormHandler);
document.querySelector('#delete-account').addEventListener('click', deleteAccountHandler);