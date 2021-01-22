async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
    // Remove the token from local storage and clear the cookie
    localStorage.removeItem('savedAccessToken');
    document.cookie = "accessToken= ;expires=Thu, 01 Jan 1970 00:00:00 UTC"
  } else {
    alert(response.statusText);
  }
}

// // Handler for the logout option
// async function logoutFormHandler(event) {
//   event.preventDefault();
//   // Remove the token from local storage and clear the cookie
//   localStorage.removeItem('savedAccessToken');
//   document.cookie = "accessToken= ;expires=Thu, 01 Jan 1970 00:00:00 UTC"

// }

document.querySelector('#logout').addEventListener('click', logout);