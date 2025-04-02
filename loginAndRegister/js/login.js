document.getElementById('loginButton').addEventListener('click', function (event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loginRequest = {
    email: email,
    password: password
  };

  
 axios.post(`${BASE_API_URL}/v1/auth/login`, loginRequest)
    .then(response => {
      const token = response.data.token;
      const fullName = response.data.fullName;
      const email = response.data.email
      const userId = response.data.id
      localStorage.setItem('authToken', token);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email', email);
      localStorage.setItem('id', userId);
      window.location.href = '../htmls/main-page.html';
      
    })
    .catch(error => {
      alert('Giriş başarısız: ' + (error.response ? error.response.data.message : error.message));
    });
});
