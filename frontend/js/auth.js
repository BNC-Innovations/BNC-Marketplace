// 1. Detect Role and Mode from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedRole = urlParams.get('role') || 'CUSTOMER';
const mode = urlParams.get('mode') || 'signup';

// Update UI based on URL
document.getElementById('display-role').innerText = selectedRole;
document.getElementById('signup-role').value = selectedRole.toUpperCase();

if (mode === 'login') toggleAuth('login');

// 2. Toggle Login/Signup
function toggleAuth(view) {
    const isLogin = view === 'login';
    document.getElementById('login-form').classList.toggle('hidden', !isLogin);
    document.getElementById('signup-form').classList.toggle('hidden', isLogin);
    document.getElementById('auth-title').innerText = isLogin ? 'Welcome Back' : 'Create Account';
}

// 3. Handle Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    try {
        const response = await fetch('http://localhost:5000/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('bnc_token', data.token); // Store JWT
            localStorage.setItem('bnc_role', data.user.role);
            
            // Redirect based on role
            if (role === 'VENDOR') window.location.href = 'onboard.html';
            else window.location.href = 'index.html';
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (err) {
        console.error("Auth Error:", err);
    }
});
