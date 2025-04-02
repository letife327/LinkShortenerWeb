document.querySelector("#registerForm").addEventListener("click", function (event) {
    event.preventDefault(); // Formun avtomatik olaraq göndərilməsini qarşısını alır
    
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
  
    console.log(fullName);
    console.log(email);
    console.log(password);
  
    // Giriş sahələrinin yoxlanması
    if (fullName === "" || email === "" || password === "") {
      alert("Zəhmət olmasa, bütün sahələri doldurun.");
      return;
    }
  
    // Email formatının yoxlanması
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Zəhmət olmasa, düzgün bir email ünvanı daxil edin.");
      return;
    }
  
    // Şifrəni yoxlamaq
    if (password.length < 6) {
      alert("Şifrə ən azı 6 simvoldan ibarət olmalıdır.");
      return;
    }
  
    // API-yə göndərmə
    const requestData = {
      fullName: fullName,
      email: email,
      password: password
    };
  
    axios.post(`${BASE_API_URL}/v1/auth/register`, requestData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // API cavabını yoxlayırıq
      const data = response.data;
      console.log(data);
      
      if (data) {
        alert(data); // OTP mesajını göstəririk
        localStorage.setItem('email', email);
        window.location.href = "../htmls/otp.html"; // OTP səhifəsinə yönləndirmək
      } else {
        alert("Qeydiyyat zamanı xəta baş verdi.");
      }
    })
    .catch(error => {
      console.error("Xəta:", error);
      alert("Qeydiyyat zamanı xəta baş verdi.");
    });
  });
  