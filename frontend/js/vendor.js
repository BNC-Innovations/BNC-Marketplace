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

// Fetch and Display Products
async function loadProducts() {
    const storeId = localStorage.getItem('bnc_store_id');
    const products = await apiFetch(`/products/store/${storeId}`);
    
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.price.toFixed(2)}</td>
            <td>${p.stock}</td>
            <td><button class="btn-sm">Edit</button></td>
        </tr>
    `).join('');
}

// Add New Product
document.getElementById('add-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('p-name').value,
        price: parseFloat(document.getElementById('p-price').value),
        stock: parseInt(document.getElementById('p-stock').value)
    };

    const res = await apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (res.product) {
        closeModal();
        loadProducts(); // Refresh the list
    }
});

