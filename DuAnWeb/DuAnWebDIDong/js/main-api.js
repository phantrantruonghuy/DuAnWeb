// ==================== API CONFIGURATION ====================
// Auto-detect API base URL
const API_BASE_URL = (() => {
    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;
    
    // Nếu đang chạy trên Docker (port 8080)
    if (window.location.port === '8080') {
        return `${baseUrl}/api`;
    }
    
    // Nếu đang chạy local với XAMPP - DuAnWeb/DuAnWeb/DuAnWebDIDong
    if (currentPath.includes('/DuAnWeb/DuAnWeb/DuAnWebDIDong/')) {
        return `${baseUrl}/DuAnWeb/DuAnWeb/DuAnWebDIDong/api`;
    }
    
    // Nếu đang chạy local với XAMPP - DuAnWeb/DuAnWebDIDong
    if (currentPath.includes('/DuAnWeb/DuAnWebDIDong/')) {
        return `${baseUrl}/DuAnWeb/DuAnWebDIDong/api`;
    }
    
    // Nếu chạy trực tiếp trong DuAnWebDIDong
    if (currentPath.includes('/DuAnWebDIDong/')) {
        return `${baseUrl}/DuAnWebDIDong/api`;
    }
    
    // Default
    return `${baseUrl}/api`;
})();

console.log('🔗 API Base URL:', API_BASE_URL);

// ==================== PRODUCT DATA FROM API ====================
let products = [];

// Load products from API
async function loadProductsFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/products.php`);
        const result = await response.json();
        
        if (result.success) {
            products = result.data;
            console.log(`✅ Đã load ${products.length} sản phẩm từ API`);
            return products;
        } else {
            console.error('❌ Lỗi load sản phẩm:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ Lỗi kết nối API:', error);
        return [];
    }
}

// ==================== UTILITY FUNCTIONS ====================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function createLogo() {
    return `
        <div class="logo d-flex align-items-center">
            <a href="index.html" class="text-decoration-none d-flex align-items-center">
                <img src="images/banners/08Oct Anis  Free Upload .png" alt="Thế Giới Di Động" class="logo-img me-2" style="height: 80px; width: auto;">
                <span class="fw-bold fs-4 text-white">Thế Giới Di Động</span>
            </a>
        </div>
    `;
}


function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const bgColor = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    }[type] || '#17a2b8';
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'} me-2"></i>${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== CART MANAGEMENT ====================
function getCartKey() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        return `cart_${user.email}`;
    }
    return 'cart_guest';
}

function getUserCart() {
    const cartKey = getCartKey();
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveUserCart(cart) {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

let cart = getUserCart();

function updateCartCount() {
    cart = getUserCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = cartCount;
    });
}

function addToCart(productId, quantity = 1) {
    console.log('🛒 addToCart called with productId:', productId, 'quantity:', quantity);
    
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        console.log('⚠️ User not logged in');
        if (confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBạn có muốn chuyển đến trang đăng nhập không?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    console.log('✅ User logged in:', JSON.parse(currentUser).name);
    
    cart = getUserCart();
    console.log('📦 Current cart:', cart);
    
    // Use == instead of === to allow type coercion
    const product = products.find(p => p.id == productId);
    if (!product) {
        console.error('❌ Product not found:', productId);
        console.log('Available products:', products.map(p => ({id: p.id, name: p.name})));
        return;
    }
    
    console.log('✅ Product found:', product.name);

    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('📝 Updated quantity:', existingItem.quantity);
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
        console.log('➕ Added new item to cart');
    }

    saveUserCart(cart);
    updateCartCount();
    showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    console.log('✅ Cart updated successfully');
}

// ==================== FORMAT CURRENCY ====================
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// ==================== CREATE LOGO ====================
function createLogo() {
    return `
        <div class="logo d-flex align-items-center">
            <a href="index.html" class="text-decoration-none d-flex align-items-center">
                <img src="images/banners/08Oct Anis  Free Upload .png" alt="Thế Giới Di Động" class="logo-img me-2" style="height: 80px; width: auto;">
                <span class="fw-bold fs-4 text-white">Thế Giới Di Động</span>
            </a>
        </div>
    `;
}

// ==================== RENDER PRODUCT CARD ====================
function renderProductCard(product) {
    return `
        <div class="col-md-3 col-sm-6 col-6">
            <div class="card product-card">
                ${product.hot ? '<span class="badge bg-danger product-badge">HOT</span>' : ''}
                ${product.discount ? `<span class="badge bg-warning product-badge" style="top: ${product.hot ? '45px' : '10px'}">-${product.discount}%</span>` : ''}
                <a href="chitiet.html?id=${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </a>
                <div class="card-body">
                    <h5 class="product-name">
                        <a href="chitiet.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                    </h5>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="product-price">${formatCurrency(product.price)}</div>
                        ${product.oldPrice ? `<div class="product-old-price">${formatCurrency(product.oldPrice)}</div>` : ''}
                    </div>
                    <div class="product-rating mb-2">
                        ${'<i class="fas fa-star text-warning"></i>'.repeat(product.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary w-100 btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProductCardWithoutBadges(product) {
    return `
        <div class="col-md-3 col-sm-6 col-6">
            <div class="card product-card">
                <a href="chitiet.html?id=${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </a>
                <div class="card-body">
                    <h5 class="product-name">
                        <a href="chitiet.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                    </h5>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="product-price">${formatCurrency(product.price)}</div>
                        ${product.oldPrice ? `<div class="product-old-price">${formatCurrency(product.oldPrice)}</div>` : ''}
                    </div>
                    <div class="product-rating mb-2">
                        ${'<i class="fas fa-star text-warning"></i>'.repeat(product.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary w-100 btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==================== LOAD HOT PRODUCTS ====================
async function loadHotProducts() {
    console.log('🔥 Loading hot products...');
    const hotProductsContainer = document.getElementById('hotProducts');
    if (!hotProductsContainer) {
        console.log('⚠️ hotProducts container not found');
        return;
    }

    if (products.length === 0) {
        console.log('📦 Products empty, loading from API...');
        await loadProductsFromAPI();
    }

    // Convert hot to boolean if it's a string
    const hotProducts = products.filter(p => p.hot == true || p.hot == 1 || p.hot === '1').slice(0, 8);
    console.log(`🔥 Found ${hotProducts.length} hot products out of ${products.length} total`);
    
    if (hotProducts.length === 0) {
        hotProductsContainer.innerHTML = '<div class="col-12 text-center text-muted">Chưa có sản phẩm HOT</div>';
        return;
    }
    
    hotProductsContainer.innerHTML = hotProducts.map(product => renderProductCardWithoutBadges(product)).join('');
    console.log('✅ Hot products rendered');
}

// ==================== LOAD DISCOUNT PRODUCTS ====================
async function loadDiscountProducts() {
    console.log('💰 Loading discount products...');
    const discountProductsContainer = document.getElementById('discountProducts');
    if (!discountProductsContainer) {
        console.log('⚠️ discountProducts container not found');
        return;
    }

    if (products.length === 0) {
        console.log('📦 Products empty, loading from API...');
        await loadProductsFromAPI();
    }

    const discountProducts = products.filter(p => p.discount > 0).slice(0, 8);
    console.log(`💰 Found ${discountProducts.length} discount products`);
    
    if (discountProducts.length === 0) {
        discountProductsContainer.innerHTML = '<div class="col-12 text-center text-muted">Chưa có sản phẩm khuyến mãi</div>';
        return;
    }
    
    discountProductsContainer.innerHTML = discountProducts.map(product => renderProductCardWithoutBadges(product)).join('');
    console.log('✅ Discount products rendered');
}

// ==================== LOAD BEST SELLING PRODUCTS ====================
async function loadBestSellingProducts() {
    console.log('📈 Loading best selling products...');
    const bestSellingProductsContainer = document.getElementById('bestSellingProducts');
    if (!bestSellingProductsContainer) {
        console.log('⚠️ bestSellingProducts container not found');
        return;
    }

    if (products.length === 0) {
        console.log('📦 Products empty, loading from API...');
        await loadProductsFromAPI();
    }

    const bestSellingProducts = products.filter(p => p.bestSelling == true || p.bestSelling == 1 || p.bestSelling === '1').slice(0, 8);
    console.log(`📈 Found ${bestSellingProducts.length} best selling products`);
    
    if (bestSellingProducts.length === 0) {
        bestSellingProductsContainer.innerHTML = '<div class="col-12 text-center text-muted">Chưa có sản phẩm bán chạy</div>';
        return;
    }
    
    bestSellingProductsContainer.innerHTML = bestSellingProducts.map(product => renderProductCardWithoutBadges(product)).join('');
    console.log('✅ Best selling products rendered');
}

// ==================== AUTH FUNCTIONS ====================
function checkLogin() {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

function requireLogin() {
    const user = checkLogin();
    if (!user) {
        sessionStorage.setItem('returnUrl', window.location.href);
        alert('Vui lòng đăng nhập để tiếp tục!');
        window.location.href = 'login.html';
        return false;
    }
    return user;
}

// ==================== AUTH UI UPDATE ====================
function updateAuthUI() {
    const currentUser = sessionStorage.getItem('currentUser');
    const loginLink = document.querySelector('a[href="login.html"]');
    
    if (currentUser && loginLink) {
        const user = JSON.parse(currentUser);
        const userName = user.name || user.username || user.email;
        
        // Replace login link with user menu
        loginLink.outerHTML = `
            <div class="dropdown">
                <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="color: white !important; text-decoration: none;">
                    <i class="fas fa-user-circle"></i> ${userName}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" style="background: white !important; z-index: 9999 !important; box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;">
                    <li><a class="dropdown-item" href="account.html" style="color: #333 !important;"><i class="fas fa-user"></i> Tài khoản</a></li>
                    <li><a class="dropdown-item" href="kiem-tra-hoa-don.html" style="color: #333 !important;"><i class="fas fa-receipt"></i> Đơn hàng</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout(); return false;" style="color: #dc3545 !important;"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
                </ul>
            </div>
        `;
    }
}

function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'index.html';
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', async () => {
    // Load products from API first
    await loadProductsFromAPI();
    
    // Initialize products page if initializeProducts function exists
    if (typeof initializeProducts === 'function') {
        initializeProducts();
    }
    
    // Then load sections
    loadHotProducts();
    loadDiscountProducts();
    loadBestSellingProducts();
    updateCartCount();
    updateAuthUI(); // Update auth UI
    
    // Initialize logo
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        logoContainer.innerHTML = createLogo();
    }
});
