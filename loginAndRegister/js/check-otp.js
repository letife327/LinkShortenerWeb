document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    
    const otp = Array.from(document.querySelectorAll('.otp-field'))
                      .map(input => input.value)
                      .join('');
  
    const email = localStorage.getItem('email'); // Burada emaili localStorage-dan alırıq
  
    // localStorage-da saxlanılan OTP ilə istifadəçinin daxil etdiyi OTP-ni müqayisə edirik
    localStorage.setItem("otp",otp)
    try {
      // OTP doğ'rulama üçün API çağırışı edirik
      const response = await axios.post('http://localhost:8080/v1/auth/check-otp', {
        email: email,
        otp: otp,
      });
  
      if (response.status === 200) {
        alert('OTP doğrulandı!');
        window.location.href = '../htmls/reset-password.html'; 
      }
    } catch (error) {
      if (error.response) {
        // Serverdən gələn xətaları göstəririk
        alert(`Xəta: ${error.response.data.message || 'OTP səhvdir'}`);
      } else {
        // Şəbəkə xətası və s. hallarda
        alert('Şəbəkə xətası və ya server cavab vermir');
      }
    }
  });
  
  // Resend OTP funksionallığı
  document.querySelector('.resend a').addEventListener('click', async function(event) {
    event.preventDefault();
  
    // localStorage-dan e-poçtu alırıq
    const email = localStorage.getItem('userEmail'); // E-poçtunu burada əldə edirik
    const requestData = {
      email:email
    }
    try {
      const response = await axios.post('http://localhost:8080/v1/auth/send-otp',requestData );
      if (response.status === 200) {
        alert('Yeni OTP göndərildi!');
       window.location.href="../htmls/reset-password.html"
      }
    } catch (error) {
      if (error.response) {
        alert(`Xəta: ${error.response.data.message || 'OTP göndərilə bilmədi'}`);
      } else {
        alert('Şəbəkə xətası və ya server cavab vermir');
      }
    }
  });
  