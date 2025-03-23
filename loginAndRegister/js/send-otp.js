document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    const emailInput = document.getElementById("email");

    button.addEventListener("click", function () {
        const email = emailInput.value.trim();

        if (!email) {
            alert("Please enter your Gmail.");
            return;
        }
        const requestData ={
            email:email
        }

        axios.post("http://localhost:8080/v1/auth/send-otp",requestData)
            .then(response => {
                const data = response.status;
                if (data==200) {
                    localStorage.setItem("email", email);
                    window.location.href="../htmls/check-otp.html"
                    alert("OTP sent successfully!");
                } else {
                    alert("Failed to receive OTP.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to send OTP.");
            });
    });
});
