const userId = localStorage.getItem('id');
const token = localStorage.getItem('authToken');
let currentPage = 0;
const pageSize = 10;

async function fetchUrlList(page = 0) {
    if (!userId || !token) {
        console.error('User ID or Token is missing');
        return;
    }

    try {
        const response = await axios.get(`${BASE_API_URL}/v1/users/url-list/${userId}?page=${page}&size=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.data || !Array.isArray(response.data.content)) {
            console.error("API'den geçersiz yanıt alındı:", response.data);
            return;
        }
        
        displayUrlList(response.data.content, response.data.page, response.data.totalPages);
    } catch (error) {
        console.error('API çağrısı sırasında hata oluştu:', error);
    }
}

function displayUrlList(urlList, page, totalPages) {
    const table = document.getElementById('links-table');
    const tableBody = document.getElementById('links-list');
    const noLinksMessage = document.getElementById('no-links-message');
    const paginationInfo = document.getElementById('pagination-info');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    if (!table || !tableBody || !noLinksMessage || !paginationInfo || !prevButton || !nextButton) {
        console.error("Gerekli HTML öğeleri bulunamadı.");
        return;
    }

    tableBody.innerHTML = '';

    if (!Array.isArray(urlList) || urlList.length === 0) {
        table.style.display = 'none';
        noLinksMessage.style.display = 'block';
        return;
    }

    noLinksMessage.style.display = 'none';
    table.style.display = 'table';

    urlList.forEach(url => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${url.title}</td>
            <td><a href="${url.originalUrl}" target="_blank">${url.originalUrl}</a></td>
            <td><a href="${BASE_API_URL}/${url.shortenedUrl}" target="_blank">${BASE_API_URL}/${url.shortenedUrl}</a></td>
        `;
        tableBody.appendChild(row);
    });

    paginationInfo.innerHTML = `Sayfa: ${page + 1} / ${totalPages}`;
    prevButton.disabled = page === 0;
    nextButton.disabled = page + 1 >= totalPages;
}

function nextPage() {
    if (!document.getElementById('next-page').disabled) {
        currentPage++;
        fetchUrlList(currentPage);
    }
}

function prevPage() {
    if (!document.getElementById('prev-page').disabled) {
        currentPage--;
        fetchUrlList(currentPage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUrlList();
    document.getElementById('next-page').addEventListener('click', nextPage);
    document.getElementById('prev-page').addEventListener('click', prevPage);
    
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }
});
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
