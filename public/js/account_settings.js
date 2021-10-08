// function executes when the account-settings form is submitted -> api call to store the settings in the DB
const settingsFormHandler = async (event) => {
  event.preventDefault();
  const bio = document.querySelector('#bio-settings').value.trim();
  const goals = document.querySelector('#goals-settings').value.trim();
  const file = document.querySelector('#imageInput').files[0]
  const previousData = document.querySelector('.settings-form').dataset.existing;
  console.log(file);
  if (previousData === "false") {
    if (bio && goals) {
      const responseObject = { bio, goals,}
      if (file !== undefined) {
        responseObject.file = file;
        
      }
      const response = await fetch('/api/users/settings', {
        method: 'POST',
        body: JSON.stringify(responseObject),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // document.location.replace('/dashboard');
      } else {
        alert('Failed to save-settings.');
      }
    } else {
    alert("You must enter both a bio and goal to continue!");
    }
  } else {
    if (bio && goals) {
      const responseObject = new FormData();
       responseObject.append("bio", bio)
       responseObject.append("goals", goals)
      

      if (file !== undefined) {
        responseObject.append("file", file)
        
      }
      const response = await fetch('/api/users/settings', {
        method: 'PUT',
        body: responseObject
        

      });
      if (response.ok) {
        // document.location.replace('/dashboard');
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