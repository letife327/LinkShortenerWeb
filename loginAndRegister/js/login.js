document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('remember');

    // Login funksiyası
    const loginUser = async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
      }

      const loginRequest = {
        email: email,
        password: password
      };

      try {
        // API-ə login sorğusu göndərmək
        const response = await axios.post('http://localhost:8080/v1/auth/login', loginRequest);
            if(response.status===200){
                const token = response.data;
                localStorage.setItem('authToken', token);
                alert("Login successful!");
                window.location.href = "../htmls/main-page.html";
            }
   

        // 'Remember me' seçilibsə tokeni localStorage-a əlavə et
        if (rememberMeCheckbox.checked) {
          localStorage.setItem('authToken', token);
        }
      } catch (error) {
        // Əgər səhv varsa, mesaj göstər
        alert(error.response ? error.response.data.message : error.message);
      }
    };

    loginButton.addEventListener('click', function(e) {
      e.preventDefault();  // Formun göndərilməsini dayandırır
      loginUser();  // Login funksiyasını çağırır
    });
  });