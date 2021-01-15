

  


// Handler for the login option
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  if (email && password) {
    const response = await fetch('/login', {
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
      //console.log(accessToken)
        // Store the token in local storage
      
      localStorage.setItem('savedAccesToken', accessToken)

      
      //document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
}


// Test function to test token login
async function checkFormHandler(event) {
  event.preventDefault();

  //console.log( 'Bearer ' + localStorage.getItem('savedAccesToken'));
  response = await fetch('/books', {
    method:'get',
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('savedAccesToken')}
  })

  


  console.log(await response.json())

}




document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.check-form').addEventListener('submit', checkFormHandler);