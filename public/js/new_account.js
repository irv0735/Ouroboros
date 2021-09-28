// function executes when the new account form is submitted -> api call to store the new user in the DB
const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#first-name-signup').value.trim();
  const lastName = document.querySelector('#last-name-signup').value.trim();
  const displayName = document.querySelector('#display-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (firstName && lastName && displayName && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, displayName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/account_details');
    } else {
      alert('Failed to create account.');
    }
  }
};

document 
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);