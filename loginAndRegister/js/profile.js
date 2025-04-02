
const modal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveBtn");
const fullNameInput = document.getElementById("fullNameInput");
const usernameDisplay = document.getElementById("username");
const userId = localStorage.getItem("id");
const fullName = localStorage.getItem('fullName');
const email = localStorage.getItem("email");
const token = localStorage.getItem("authToken"); 
const profileImg = document.querySelector(".profile-photo img"); 
window.onload = function () {
    if (fullName) {
        document.getElementById('username').textContent = fullName;
        document.getElementById("email").textContent = `Email: ${email}`
        fetchUserProfile();
        document.getElementById("editModal").style.display = "none";
        
    } else {
        document.getElementById('username').textContent = 'Guest';
        document.getElementById('email').textContent = 'Email: example@gmail.com';
    }
};

document.getElementById("editBtn").addEventListener("click", function () {
    document.getElementById("editModal").style.display = "flex";
    document.getElementById("fullNameInput").value = document.getElementById("username").textContent;
});
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("editModal").style.display = "none";
});
document.getElementById("saveBtn").addEventListener("click", function () {
    let newName = document.getElementById("fullNameInput").value;
    if (newName.trim() !== "") {
        document.getElementById("username").textContent = newName;
        document.getElementById("editModal").style.display = "none";
    }
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


saveBtn.addEventListener("click", function () {
    const newFullName = fullNameInput.value.trim();
    if (newFullName === "") {
        alert("Full name cannot be empty");
        return;
    }
    const requestData ={
        fullName:newFullName
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    axios.put(`http://localhost:8080/v1/users/${userId}`,requestData, { headers: headers } )
        .then(response => {
            usernameDisplay.textContent = newFullName;
            modal.style.display = "none";
            localStorage.setItem("fullName", newFullName);
        })
        .catch(error => {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        });
});

// profil fotorafi ichin
// document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "image/*"; 
    uploadInput.style.display = "none";
    document.body.appendChild(uploadInput);

    const uploadBtn = document.createElement("button");
    uploadBtn.innerText = "Upload Photo";
    document.querySelector(".profile-container").appendChild(uploadBtn);

    uploadBtn.addEventListener("click", () => uploadInput.click());

    uploadInput.addEventListener("change", function () {
        if (uploadInput.files.length > 0) {
            const file = uploadInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImg.src = e.target.result; // Seçilen fotoğrafı önizleme olarak göster
            };

            reader.readAsDataURL(file); // Dosyayı oku ve base64 formatına çevir
            uploadPhoto(file); // Seçilen fotoğrafı API'ye yükle
        }
    });

    function uploadPhoto(file) {
        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.getItem("authToken"); 
        if (!token) {
            alert("User not authenticated!");
            return;
        }

        axios.post("http://localhost:8080/profile/uploadPhoto", formData, {
            headers: { 
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            alert("Photo uploaded successfully!");
            fetchUserProfile(); // Fotoğrafı güncellemek için API'den tekrar veri çek
        })
        .catch(error => {
            console.error("Upload error:", error);
            alert("Failed to upload photo.");
        });
    }

// });

function fetchUserProfile() {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
        alert("User not authenticated!");
        return;
    }

    axios.get(`http://localhost:8080/v1/users/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("User Details:", response.data);
        if(response.data.photoUrl=="http://localhost:8080/profile/download/null"){
            profileImg.src="../images/profilphoto.webp"
        }
        else{
            profileImg.src = response.data.photoUrl;
        }
    })
    .catch(error => {
        console.error("Failed to fetch user details:", error);
    });
}
// for logout 
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector('#logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault(); // Sayfanın varsayılan davranışını engelle

            // LocalStorage temizle
            localStorage.clear();

            // Kullanıcıyı giriş (login) sayfasına yönlendir
            window.location.href = "../htmls/login.html"; // Login sayfasının yolu
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
});
