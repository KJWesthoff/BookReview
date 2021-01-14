  
  

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
         // Store the token in local storage
         
         
         let data = await response.json();
         let accessToken = await data.accessToken
         console.log(accessToken)
         localStorage.setItem('savedAccesToken', accessToken)

        
        //document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  