document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const passwordInput = form.querySelector('input[type="password"]').value;
        const email = localStorage.getItem("email"); // LocalStorage-dan email al
        const otp = localStorage.getItem("otp"); // LocalStorage-dan OTP al

        if (!email || !otp) {
            alert("Email və ya OTP tapılmadı! Yenidən cəhd edin.");
            return;
        }

        const requestData = {
            email: email,
            otp: otp,
            password: passwordInput
        };

        try {
            const response = await axios.post("http://localhost:8080/v1/auth/reset-password", requestData);
            if (response.status === 200) {
                alert("Şifrə uğurla dəyişdirildi!");
                window.location.href = '../htmls/login.html'; 
                localStorage.removeItem("email"); // Məlumatları təmizlə
                localStorage.removeItem("otp");
            }
        
        } catch (error) {
            if (error.response) {
                alert("Xəta baş verdi: " + error.response.data);
            } else {
                alert("Şəbəkə xətası baş verdi.");
            }
            console.error("Xəta:", error);
        }
    });
});
