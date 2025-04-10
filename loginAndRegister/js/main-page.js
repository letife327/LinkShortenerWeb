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

// Bakı üçün hava məlumatını göstərmək
const weatherBox = document.getElementById("weather-box");
const tempElem = document.getElementById("weather-temp");
const descElem = document.getElementById("weather-desc");
const weatherIcon = document.createElement("img");

// Open-Meteo API istifadə olunur
fetch("https://api.open-meteo.com/v1/forecast?latitude=40.4093&longitude=49.8671&current_weather=true")
    .then(response => response.json())
    .then(data => {
        const weather = data.current_weather;
        const temp = weather.temperature;
        const condition = weather.weathercode;

        // Temperaturu göstər
        tempElem.textContent = `Temperature: ${temp}°C`;

        // Şərhi göstər
        if (condition === 0) {
            descElem.textContent = "Clear sky";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/sun.png"; // Günəşli hava
        } else if (condition === 1 || condition === 2) {
            descElem.textContent = "Partly cloudy";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/clouds.png"; // Buludlu hava
        } else if (condition === 3 || condition === 4) {
            descElem.textContent = "Overcast";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/clouds.png"; // Buludlu hava
        } else if (condition === 51 || condition === 53 || condition === 55) {
            descElem.textContent = "Drizzle";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/rain.png"; // Yağışlı hava
        } else if (condition === 61 || condition === 63 || condition === 65) {
            descElem.textContent = "Rain";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/rain.png"; // Yağışlı hava
        } else {
            descElem.textContent = "Unpredictable weather";
            weatherIcon.src = "https://img.icons8.com/ios/50/000000/question-mark.png"; // Naməlum hava
        }

        // Şəkili box-a əlavə et
        weatherBox.appendChild(weatherIcon);
    })
    .catch(err => {
        tempElem.textContent = "Could not load weather data.";
        descElem.textContent = "";
        weatherBox.appendChild(weatherIcon);
        weatherIcon.src = "https://img.icons8.com/ios/50/000000/question-mark.png"; // Şəkil səhv olduqda
    });
