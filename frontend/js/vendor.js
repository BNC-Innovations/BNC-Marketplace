// js/vendor.js

// 1. Guard Rail: Ensure only Vendors can see this page
window.onload = () => {
    const role = localStorage.getItem('bnc_role');
    if (role !== 'VENDOR') {
        window.location.href = 'index.html';
    }
};

// 2. Handle Onboarding Form
const onboardForm = document.getElementById('onboard-form');

if (onboardForm) {
    onboardForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const storeData = {
            name: document.getElementById('store-name').value,
            description: document.getElementById('store-desc').value,
            address: document.getElementById('store-address').value
        };

        try {
            // Using the apiFetch utility from api.js
            const response = await apiFetch('/vendors/onboard', {
                method: 'POST',
                body: JSON.stringify(storeData)
            });

            if (response.store_id) {
                alert("Store Created Successfully!");
                window.location.href = 'vendor-dash.html';
            } else {
                alert(response.message || "Failed to setup store.");
            }
        } catch (err) {
            console.error("Onboarding Error:", err);
            alert("Connection error. Is your backend running?");
        }
    });
}
