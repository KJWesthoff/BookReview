// Handler for the logout option
async function logoutFormHandler() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    // Remove the token from local storage and clear the cookie
    // localStorage.removeItem('savedAccessToken');
    // document.cookie = "accessToken=";
    document.location.replace('/');

  } else {
    alert(response.statusText);
  }

}

document.querySelector('#logout').addEventListener('click', logoutFormHandler);