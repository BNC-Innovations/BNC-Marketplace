/**
 * Shared UI Helpers for BNC Markets
 */

// 1. Modal Toggle
function toggleModal(modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

// 2. Logout Logic
function logout() {
    localStorage.removeItem('bnc_token');
    localStorage.removeItem('bnc_role');
    window.location.href = 'index.html';
}

// 3. Handle Sidebar Active States
function setActiveMenu() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => {
        if (path.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// Global Event Listeners
document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});
