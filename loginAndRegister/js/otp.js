// OTP doğrulama forması
document.getElementById('verify').addEventListener('click', function(e) {
    e.preventDefault(); // Formanın təkrar yüklənməsinin qarşısını alır

    const otp = document.getElementById('otp').value;
    const email = localStorage.getItem('email'); // E-poçt əvvəlki səhifədə saxlanıbsa onu alırıq
    console.log(email);
    

    if (!email) {
        alert('E-poçt tapılmadı. Zəhmət olmasa qeydiyyatdan keçin.');
        return;
    }
    const requestData = {
        email:email,
        otp:otp
    }

    // OTP doğrulama sorğusu göndəririk
    axios.post(`${BASE_API_URL}/v1/auth/verifying-code`, requestData)
    .then(response => {
        if (response.data === 'User successfully verified') {
            alert('OTP doğrulandı, istifadəçi aktivləşdirildi.');
            localStorage.setItem("email", email);
            window.location.href="../htmls/login.html"

        } else {
            alert('OTP doğrulanmadı. Xahiş edirik yenidən yoxlayın.');
        }
    })
    .catch(error => {
        console.error('Xəta:', error);
        alert('Xəta baş verdi, zəhmət olmasa sonra yenidən cəhd edin.');
    });
});
