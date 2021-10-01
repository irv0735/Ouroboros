// function executes when logout is clicked -> initiates the api call and sends user to login page
const logout = async () => {
  const response = await API.logout();

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

