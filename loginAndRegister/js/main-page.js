window.onload = function() {
    const fullName = localStorage.getItem('fullName');
    if (fullName) {
      document.getElementById('username').textContent = fullName;
    } else {
      document.getElementById('username').textContent = 'Guest';
    }
  };

  // Link Shortener start

  document.getElementById('shortener-btn').addEventListener('click', function(event) {
    event.preventDefault();
  
    const longUrl = document.getElementById('long-url').value; 
    const title = document.getElementById('title').value; 
    
    const token = localStorage.getItem("authToken"); // Replace this with your actual Bearer token
  
    const urlRequest = {
        originalUrl: longUrl,
        title: title
    };
  
    // Set the headers to include Authorization with Bearer token
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Optional, depending on your server requirements
    };
  
    axios.post(`${BASE_API_URL}/change-url`, urlRequest, { headers: headers })
        .then(function(response) {
            const shortenedUrl = response.data; 
            const shortenedLinksContainer = document.getElementById('shortened-links');
            shortenedLinksContainer.innerHTML = `
                <h3>${shortenedUrl}</h3>
                <button id="copyButton">Copy</button>
            `;
  
            document.getElementById('copyButton').addEventListener('click', function() {
                navigator.clipboard.writeText(shortenedUrl)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch(err => console.error('Failed to copy text: ', err));
            });
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('An error occurred while shortening the URL.');
        });
  });
  

  // Link Shortener end

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