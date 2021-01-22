// Handler for the login option
async function loginFormHandler(event) {
  
  console.log("Login Client Side Function Running")
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        
        
      let data = await response.json();
      let accessToken = await data.accessToken
      
      
      // Store the token in local storage for later use
      localStorage.setItem('savedAccessToken', accessToken)

      // Also store the token in a cookie
      document.cookie = "accessToken="+accessToken;
      
      document.location.replace('/');

      //document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
}

// Sign-up a new user
async function signupFormHandler(event) {
  event.preventDefault();

  // get data from form
  const username = document.querySelector('#username-signup').value.trim(); 
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  
  console.log(username, email, password);

  // put the new user in the dm



  if (email && password && username) {
    const response = await fetch('/api/users/', {
      method: 'post',
      body: JSON.stringify({
        "username": username,
        "email":email,
        "password":password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        
        
      let data = await response.json();
      let accessToken = await data.accessToken
        
      // Store the token in local storage for later use
      localStorage.setItem('savedAccessToken', accessToken)

      // Also store the token in a cookie
      document.cookie = "accessToken="+accessToken;
      
      
      document.location.replace('/userpage');
    } else {
      alert(response.statusText);
    }
  }
  
}

// // Handler for the logout option
// async function logoutFormHandler(event) {
//   event.preventDefault();
//   // Remove the token from local storage and clear the cookie
//   localStorage.removeItem('savedAccessToken');
//   document.cookie = "accessToken= ;expires=Thu, 01 Jan 1970 00:00:00 UTC"
      
// }

// Test functions for test buttons
// ==================================================== 

// list all the books with authorization
async function checkFormHandler(event) {
  event.preventDefault();

  // handle the case where there is no token (user logged)
  if(!localStorage.getItem('savedAccessToken')){
    console.log("No token")
    return;

  }
  //console.log( 'Bearer ' + localStorage.getItem('savedAccessToken'));
  response = await fetch('/api/books/auth', {
    method:'get',
    headers: {'authorization': 'Bearer ' + localStorage.getItem('savedAccessToken')}
  })

  console.log(await response.json())
  document.location.replace('/api/books/auth');

}

// Test function to test token login
async function goToUserPageFormHandler(event) {
  event.preventDefault();

  // handle the case where there is no token (user logged)
  if(!localStorage.getItem('savedAccessToken')){
    console.log("No token")
    return;

  }
  
  document.location.replace('/userpage');
}
// ===========================================


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// document.querySelector('.check-form').addEventListener('submit', checkFormHandler);
