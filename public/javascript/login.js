

  


// Handler for the login option
async function loginFormHandler(event) {
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
      localStorage.setItem('savedAccesToken', accessToken)

      
      //document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
}

// Handler for the login option
async function logoutFormHandler(event) {
  event.preventDefault();
  // Remove the token from local storage
  localStorage.removeItem('savedAccesToken');
  
}




// Test function to test token login
async function checkFormHandler(event) {
  event.preventDefault();

  //console.log( 'Bearer ' + localStorage.getItem('savedAccesToken'));
  response = await fetch('/api/books/auth', {
    method:'get',
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('savedAccesToken')}
  })

  
  console.log(await response.json())
  

}




document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.check-form').addEventListener('submit', checkFormHandler);