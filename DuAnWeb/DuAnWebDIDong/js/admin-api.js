// ==================== ADMIN API ====================
// Note: API_BASE_URL and products are defined in main-api.js

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.admin-notification');
    if (existing) existing.remove();
    
    const bgColor = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    }[type] || '#17a2b8';
    
    const notification = document.createElement('div');
    notification.className = 'admin-notification';
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
    `;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'} me-2"></i>${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// ==================== AUTH ====================
function checkAuth() {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    } else {
        const username = sessionStorage.getItem('adminUsername');
        if (username) {
            document.getElementById('adminName').textContent = username;
        }
    }
}

function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        window.location.href = 'admin-login.html';
    }
}

// ==================== LOAD PRODUCTS FROM API ====================
// products array is defined in main-api.js

async function loadProductsFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/products.php`);
        const result = await response.json();
        
        if (result.success) {
            products = result.data;
            window.products = products; // For compatibility
            console.log(`✅ Loaded ${products.length} products from API`);
            return products;
        } else {
            console.error('❌ Error loading products:', result.message);
            showNotification('Lỗi tải sản phẩm: ' + result.message, 'error');
            return [];
        }
    } catch (error) {
        console.error('❌ API connection error:', error);
        showNotification('Không thể kết nối API. Kiểm tra XAMPP!', 'error');
        return [];
    }
}

// ==================== LOAD ORDERS FROM API ====================
let orders = [];

async function loadOrdersFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`);
        const result = await response.json();
        
        if (result.success) {
            orders = result.data;
            console.log(`✅ Loaded ${orders.length} orders from API`);
            return orders;
        } else {
            console.error('❌ Error loading orders:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ API connection error:', error);
        return [];
    }
}

// ==================== LOAD REVIEWS FROM API ====================
let reviews = [];

async function loadReviewsFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews.php`);
        const result = await response.json();
        
        if (result.success) {
            reviews = result.data;
            console.log(`✅ Loaded ${reviews.length} reviews from API`);
            return reviews;
        } else {
            console.error('❌ Error loading reviews:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ API connection error:', error);
        return [];
    }
}

// ==================== LOAD RECENT ORDERS ====================
function loadRecentOrders() {
    const tbody = document.getElementById('recentOrdersTable');
    
    if (!tbody) {
        console.log('⚠️ recentOrdersTable not found');
        return;
    }
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Chưa có đơn hàng nào</td></tr>';
        return;
    }
    
    // Sort and get 5 most recent orders
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    tbody.innerHTML = recentOrders.map(order => {
        // items is already an array from API, no need to parse
        const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
        
        return `
        <tr>
            <td>${order.order_number || '#' + order.id}</td>
            <td>${order.customer_name || 'Khách hàng'}</td>
            <td>${itemsCount} sản phẩm</td>
            <td>${formatCurrency(order.total || 0)}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status || 'Chờ xác nhận'}</span></td>
            <td>${new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
        </tr>
        `;
    }).join('');
}

function getStatusColor(status) {
    const colors = {
        'Chờ xác nhận': 'warning',
        'Đã xác nhận': 'info',
        'Đang giao': 'primary',
        'Hoàn thành': 'success',
        'Đã hủy': 'danger'
    };
    return colors[status] || 'secondary';
}

// ==================== DASHBOARD ====================
async function loadDashboard() {
    console.log('📊 Loading dashboard...');
    
    // Load data from API
    await loadProductsFromAPI();
    await loadOrdersFromAPI();
    
    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Count customers from users API (exclude admins)
    try {
        const response = await fetch(`${API_BASE_URL}/users.php`);
        const result = await response.json();
        if (result.success && result.data) {
            const customers = result.data.filter(u => u.role !== 'admin');
            document.getElementById('totalCustomers').textContent = customers.length;
            console.log(`👥 Total customers: ${customers.length} (excluding admins)`);
        } else {
            // Fallback: count unique emails from orders
            const uniqueEmails = [...new Set(orders.map(o => o.customer_email).filter(e => e))];
            document.getElementById('totalCustomers').textContent = uniqueEmails.length;
        }
    } catch (error) {
        console.error('❌ Error loading customers count:', error);
        // Fallback: count unique emails from orders
        const uniqueEmails = [...new Set(orders.map(o => o.customer_email).filter(e => e))];
        document.getElementById('totalCustomers').textContent = uniqueEmails.length;
    }
    
    // Calculate revenue
    let totalRevenue = 0;
    orders.forEach(order => {
        if (order.status === 'Hoàn thành' || order.status === 'Đang giao' || order.status === 'Đã xác nhận') {
            totalRevenue += order.total || 0;
        }
    });
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    
    // Load recent orders
    loadRecentOrders();
    
    // Render charts
    renderCharts();
    
    console.log('✅ Dashboard loaded');
}

// ==================== RENDER CHARTS ====================
function renderCharts() {
    console.log('📊 Rendering charts...');
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        // Get last 7 days
        const last7Days = [];
        const revenueData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            last7Days.push(dateStr);
            
            // Calculate revenue for this day
            const dayRevenue = orders
                .filter(o => {
                    const orderDate = new Date(o.created_at);
                    return orderDate.toDateString() === date.toDateString() && 
                           (o.status === 'Hoàn thành' || o.status === 'Đang giao');
                })
                .reduce((sum, o) => sum + (o.total || 0), 0);
            
            revenueData.push(dayRevenue);
        }
        
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Doanh thu (VNĐ)',
                    data: revenueData,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Order Status Chart
    const orderStatusCtx = document.getElementById('orderStatusChart');
    if (orderStatusCtx) {
        const statusCounts = {
            'Chờ xác nhận': orders.filter(o => o.status === 'Chờ xác nhận').length,
            'Đã xác nhận': orders.filter(o => o.status === 'Đã xác nhận').length,
            'Đang giao': orders.filter(o => o.status === 'Đang giao').length,
            'Hoàn thành': orders.filter(o => o.status === 'Hoàn thành').length,
            'Đã hủy': orders.filter(o => o.status === 'Đã hủy').length
        };
        
        new Chart(orderStatusCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Số đơn hàng',
                    data: Object.values(statusCounts),
                    backgroundColor: [
                        'rgba(255, 193, 7, 0.8)',   // warning - Chờ xác nhận
                        'rgba(13, 202, 240, 0.8)',  // info - Đã xác nhận
                        'rgba(13, 110, 253, 0.8)',  // primary - Đang giao
                        'rgba(25, 135, 84, 0.8)',   // success - Hoàn thành
                        'rgba(220, 53, 69, 0.8)'    // danger - Đã hủy
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Top Products Chart
    const topProductsCtx = document.getElementById('topProductsChart');
    if (topProductsCtx) {
        // Calculate product sales from orders
        const productSales = {};
        
        orders.forEach(order => {
            if (Array.isArray(order.items)) {
                order.items.forEach(item => {
                    if (!productSales[item.name]) {
                        productSales[item.name] = 0;
                    }
                    productSales[item.name] += item.quantity;
                });
            }
        });
        
        // Sort and get top 10
        const sortedProducts = Object.entries(productSales)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        const productNames = sortedProducts.map(p => p[0]);
        const productQuantities = sortedProducts.map(p => p[1]);
        
        new Chart(topProductsCtx, {
            type: 'bar',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Số lượng bán',
                    data: productQuantities,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Brand Chart
    const brandCtx = document.getElementById('brandChart');
    if (brandCtx) {
        // Count products by brand
        const brandCounts = {};
        
        products.forEach(product => {
            const brand = product.brand || 'Khác';
            if (!brandCounts[brand]) {
                brandCounts[brand] = 0;
            }
            brandCounts[brand]++;
        });
        
        // Sort by count and get top brands
        const sortedBrands = Object.entries(brandCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);
        
        const brandNames = sortedBrands.map(b => b[0]);
        const brandValues = sortedBrands.map(b => b[1]);
        
        new Chart(brandCtx, {
            type: 'pie',
            data: {
                labels: brandNames,
                datasets: [{
                    label: 'Số sản phẩm',
                    data: brandValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(199, 199, 199, 0.8)',
                        'rgba(83, 102, 255, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    console.log('✅ Charts rendered');
}

// ==================== LOAD PRODUCTS TABLE ====================
async function loadProductsTable() {
    console.log('🔄 Loading products table...');
    
    if (products.length === 0) {
        console.log('📦 Products array empty, loading from API...');
        await loadProductsFromAPI();
    }
    
    console.log(`📊 Total products: ${products.length}`);
    
    const tbody = document.getElementById('productsTable');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">Chưa có sản phẩm nào</td></tr>';
        console.log('⚠️ No products to display');
        return;
    }
    
    console.log('✅ Rendering products table...');
    
    tbody.innerHTML = products.map(product => {
        const stock = product.stock || 0;
        const statusBadge = stock === 0 ? 
            `<span class="badge bg-danger">Hết hàng</span>` : 
            `<span class="badge bg-success">Còn hàng</span>`;
        
        return `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: contain;"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${stock}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
}

// ==================== PREVIEW PRODUCT IMAGE ====================
function previewProductImage() {
    const imageUrl = document.getElementById('productImage').value;
    const previewDiv = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    if (imageUrl) {
        previewImg.src = imageUrl;
        previewDiv.style.display = 'block';
        
        // Handle image load error
        previewImg.onerror = function() {
            previewDiv.style.display = 'none';
            showNotification('Không thể tải hình ảnh. Vui lòng kiểm tra URL.', 'warning');
        };
    } else {
        previewDiv.style.display = 'none';
    }
}

// ==================== SAVE PRODUCT (ADD/EDIT) ====================
async function saveProduct() {
    const form = document.getElementById('productForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const productId = document.getElementById('productId').value;
    const isEdit = productId !== '';
    
    const productData = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        price: parseInt(document.getElementById('productPrice').value),
        oldPrice: parseInt(document.getElementById('productOldPrice').value) || null,
        discount: calculateDiscount(),
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
        ram: parseInt(document.getElementById('productRam').value.replace('GB', '')),
        storage: parseInt(document.getElementById('productStorage').value.replace('GB', '')),
        rating: parseInt(document.getElementById('productRating').value),
        hot: document.getElementById('productHot').checked,
        bestSelling: document.getElementById('productBestSelling').checked,
        stock: parseInt(document.getElementById('productStock').value) || 0,
        specs: {
            'Màn hình': document.getElementById('productScreen').value || 'Chưa cập nhật',
            'Camera sau': document.getElementById('productCameraBack').value || 'Chưa cập nhật',
            'Camera trước': document.getElementById('productCameraFront').value || 'Chưa cập nhật',
            'CPU': document.getElementById('productCPU').value || 'Chưa cập nhật',
            'RAM': document.getElementById('productRam').value,
            'Bộ nhớ trong': document.getElementById('productStorage').value,
            'Pin': document.getElementById('productBattery').value || 'Chưa cập nhật'
        },
        description: document.getElementById('productDescription').value
    };
    
    if (isEdit) {
        productData.id = parseInt(productId);
    }
    
    try {
        const url = `${API_BASE_URL}/products.php`;
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message || (isEdit ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!'), 'success');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
            modal.hide();
            
            // Reload products
            await loadProductsFromAPI();
            loadProductsTable();
            loadAccessoriesTable(); // Also reload accessories table
        } else {
            showNotification('Lỗi: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Có lỗi xảy ra khi lưu sản phẩm!', 'error');
    }
}

// ==================== SHOW ADD PRODUCT MODAL ====================
function showAddProductModal(defaultCategory = 'phone') {
    // Reset form
    const form = document.getElementById('productForm');
    if (form) form.reset();
    
    document.getElementById('productId').value = '';
    document.getElementById('productModalTitle').textContent = defaultCategory === 'accessory' ? 'Thêm phụ kiện mới' : 'Thêm sản phẩm mới';
    
    // Set default category
    const categorySelect = document.getElementById('productCategory');
    if (categorySelect) {
        categorySelect.value = defaultCategory;
    }
    
    // Reset spec fields if they exist
    const fields = ['productScreen', 'productCPU', 'productCameraBack', 'productCameraFront', 'productBattery', 'productStock'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = id === 'productStock' ? 0 : '';
    });
    
    // Hide image preview
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) imagePreview.style.display = 'none';
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// ==================== EDIT PRODUCT ====================
function editProduct(id) {
    const product = products.find(p => p.id == id);
    if (!product) {
        showNotification('Không tìm thấy sản phẩm!', 'error');
        return;
    }
    
    // Fill form
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOldPrice').value = product.oldPrice || '';
    document.getElementById('productDiscount').value = product.discount || 0;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productCategory').value = product.category || 'phone';
    document.getElementById('productRam').value = product.ram || '';
    document.getElementById('productStorage').value = product.storage || '';
    document.getElementById('productRating').value = product.rating || 5;
    document.getElementById('productStock').value = product.stock || 0;
    document.getElementById('productDescription').value = product.description || '';
    
    // Checkboxes
    document.getElementById('productHot').checked = product.hot == 1 || product.hot === true;
    document.getElementById('productBestSelling').checked = product.bestSelling == 1 || product.bestSelling === true;
    
    // Specs
    if (product.specs) {
        const specs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
        document.getElementById('productScreen').value = specs['Màn hình'] || '';
        document.getElementById('productCPU').value = specs['CPU'] || '';
        document.getElementById('productCameraBack').value = specs['Camera sau'] || '';
        document.getElementById('productCameraFront').value = specs['Camera trước'] || '';
        document.getElementById('productBattery').value = specs['Pin'] || '';
    }
    
    // Update modal title
    document.getElementById('productModalTitle').textContent = 'Sửa sản phẩm';
    
    // Show image preview
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    if (imagePreview && previewImg && product.image) {
        previewImg.src = product.image;
        imagePreview.style.display = 'block';
    }
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// ==================== DELETE PRODUCT ====================
async function deleteProduct(id) {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/products.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Xóa sản phẩm thành công!', 'success');
            await loadProductsFromAPI();
            loadProductsTable();
            loadAccessoriesTable(); // Also reload accessories table
        } else {
            showNotification('Lỗi: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Có lỗi xảy ra khi xóa sản phẩm!', 'error');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function calculateDiscount() {
    const price = parseInt(document.getElementById('productPrice').value) || 0;
    const oldPrice = parseInt(document.getElementById('productOldPrice').value) || 0;
    
    if (oldPrice > price) {
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return 0;
}

function getStatusColor(status) {
    const colors = {
        'Chờ xác nhận': 'warning',
        'Đã xác nhận': 'info',
        'Đang giao': 'primary',
        'Hoàn thành': 'success',
        'Đã hủy': 'danger'
    };
    return colors[status] || 'secondary';
}

// ==================== LOAD ACCESSORIES TABLE ====================
function loadAccessoriesTable() {
    console.log('🔄 Loading accessories table...');
    const tbody = document.getElementById('accessoriesTable');
    if (!tbody) return;
    
    // Filter accessories from products (category = 'accessory')
    const accessories = products.filter(p => p.category === 'accessory');
    
    if (accessories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Chưa có phụ kiện nào</td></tr>';
        return;
    }
    
    tbody.innerHTML = accessories.map(product => {
        const stock = product.stock || 0;
        const statusBadge = stock > 0 
            ? `<span class="badge bg-success">Còn hàng (${stock})</span>`
            : `<span class="badge bg-danger">Hết hàng</span>`;
        
        return `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>${product.brand || 'N/A'}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${stock}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
}

// ==================== LOAD CUSTOMERS TABLE ====================
async function loadCustomersTable() {
    console.log('🔄 Loading customers table...');
    const tbody = document.getElementById('customersTable');
    if (!tbody) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/users.php`);
        const result = await response.json();
        
        console.log('👥 Users API response:', result);
        
        if (result.success && result.data) {
            const customers = result.data.filter(u => u.role !== 'admin');
            
            console.log(`👥 Found ${customers.length} customers (excluding admins)`);
            
            if (customers.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">Chưa có khách hàng nào</td></tr>';
                return;
            }
            
            tbody.innerHTML = customers.map(user => {
                const createdDate = user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A';
                return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.email || 'N/A'}</td>
                    <td>${user.phone || 'N/A'}</td>
                    <td>${createdDate}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="viewCustomerDetails(${user.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCustomer(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
            }).join('');
        } else {
            console.error('❌ API error:', result);
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Không thể tải danh sách khách hàng</td></tr>';
        }
    } catch (error) {
        console.error('❌ Error loading customers:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Lỗi khi tải dữ liệu</td></tr>';
    }
}

// ==================== LOAD CATEGORIES TABLE ====================
async function loadCategoriesTable() {
    console.log('🔄 Loading categories table...');
    const tbody = document.getElementById('categoriesTable');
    if (!tbody) {
        console.error('❌ categoriesTable not found!');
        return;
    }
    
    try {
        const url = `${API_BASE_URL}/categories.php`;
        console.log('📡 Fetching:', url);
        
        const response = await fetch(url);
        console.log('📥 Response status:', response.status);
        
        const data = await response.json();
        console.log('📊 Categories data:', data);
        
        if (data.success && data.categories) {
            const categories = data.categories;
            console.log('✅ Found', categories.length, 'categories');
            
            if (categories.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">Chưa có danh mục nào</td></tr>';
                return;
            }
            
            tbody.innerHTML = categories.map(cat => `
                <tr>
                    <td>${cat.id}</td>
                    <td><i class="fas ${cat.icon}"></i></td>
                    <td>${cat.name}</td>
                    <td>${cat.slug}</td>
                    <td><span class="badge bg-primary">${cat.product_count} sản phẩm</span></td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="editCategory(${cat.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
            console.log('✅ Categories table rendered');
        } else {
            console.error('❌ API returned error:', data);
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Không thể tải danh mục</td></tr>';
        }
    } catch (error) {
        console.error('❌ Error loading categories:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Lỗi khi tải dữ liệu: ' + error.message + '</td></tr>';
    }
}

// ==================== LOAD BRANDS TABLE ====================
async function loadBrandsTable() {
    console.log('🔄 Loading brands table...');
    const tbody = document.getElementById('brandsTable');
    if (!tbody) {
        console.error('❌ brandsTable not found!');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/brands.php`);
        const data = await response.json();
        
        if (data.success && data.brands) {
            const brands = data.brands;
            
            if (brands.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center">Chưa có thương hiệu nào</td></tr>';
                return;
            }
            
            tbody.innerHTML = brands.map(brand => `
                <tr>
                    <td>${brand.id}</td>
                    <td>${brand.name}</td>
                    <td><span class="badge bg-primary">${brand.product_count} sản phẩm</span></td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="editBrand('${brand.name}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Không thể tải thương hiệu</td></tr>';
        }
    } catch (error) {
        console.error('❌ Error loading brands:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Lỗi khi tải dữ liệu</td></tr>';
    }
}

// ==================== LOAD ORDERS TABLE ====================
async function loadOrdersTable() {
    console.log('🔄 Loading orders table...');
    const tbody = document.getElementById('ordersTable');
    if (!tbody) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`);
        const data = await response.json();
        
        console.log('📦 Orders API response:', data);
        
        if (data.success && data.data) {
            const orders = data.data; // API returns data.data, not data.orders
            console.log('📦 Loaded', orders.length, 'orders from API');
            
            if (orders.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="text-center">Chưa có đơn hàng nào</td></tr>';
                return;
            }
            
            tbody.innerHTML = orders.map(order => {
                const statusColor = getStatusColor(order.status);
                const orderDate = new Date(order.created_at).toLocaleDateString('vi-VN');
                
                return `
                <tr>
                    <td>${order.order_number || '#' + order.id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.customer_phone}</td>
                    <td>${formatCurrency(order.total)}</td>
                    <td>
                        <select class="form-select form-select-sm badge bg-${statusColor}" 
                                onchange="updateOrderStatus(${order.id}, this.value)"
                                style="width: auto; display: inline-block;">
                            <option value="Chờ xác nhận" ${order.status === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
                            <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                            <option value="Đang giao" ${order.status === 'Đang giao' ? 'selected' : ''}>Đang giao</option>
                            <option value="Hoàn thành" ${order.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                            <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                        </select>
                    </td>
                    <td>${orderDate}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="viewOrderDetails(${order.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
            }).join('');
        } else {
            console.error('❌ API error:', data);
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Không thể tải đơn hàng: ' + (data.message || 'Unknown error') + '</td></tr>';
        }
    } catch (error) {
        console.error('❌ Error loading orders:', error);
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Lỗi khi tải dữ liệu: ' + error.message + '</td></tr>';
    }
}

// ==================== UPDATE ORDER STATUS ====================
async function updateOrderStatus(orderId, newStatus) {
    console.log('🔄 Updating order', orderId, 'to status:', newStatus);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: orderId,
                status: newStatus
            })
        });
        
        const result = await response.json();
        console.log('📥 Update response:', result);
        
        if (result.success) {
            showNotification('Cập nhật trạng thái đơn hàng thành công!', 'success');
            // Reload orders to update dashboard stats
            await loadOrdersFromAPI();
            loadDashboard();
        } else {
            showNotification('Lỗi: ' + result.message, 'error');
            loadOrdersTable(); // Reload to revert the dropdown
        }
    } catch (error) {
        console.error('❌ Error updating order status:', error);
        showNotification('Không thể cập nhật trạng thái đơn hàng!', 'error');
        loadOrdersTable(); // Reload to revert the dropdown
    }
}

// ==================== VIEW ORDER DETAILS ====================
async function viewOrderDetails(orderId) {
    console.log('👁️ Viewing order details:', orderId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php?id=${orderId}`);
        const result = await response.json();
        
        if (!result.success || !result.data) {
            showNotification('Không thể tải chi tiết đơn hàng', 'error');
            return;
        }
        
        const order = result.data;
        
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain;"></td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>${formatCurrency(item.price * item.quantity)}</td>
                </tr>
            `;
        });
        
        const modalContent = `
            <div class="row mb-3">
                <div class="col-md-6">
                    <p><strong>Mã đơn hàng:</strong> ${order.order_number}</p>
                    <p><strong>Ngày đặt:</strong> ${new Date(order.created_at).toLocaleString('vi-VN')}</p>
                    <p><strong>Trạng thái:</strong> <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></p>
                </div>
                <div class="col-md-6">
                    <p><strong>Khách hàng:</strong> ${order.customer_name}</p>
                    <p><strong>Số điện thoại:</strong> ${order.customer_phone}</p>
                    <p><strong>Email:</strong> ${order.customer_email || 'Không có'}</p>
                </div>
            </div>
            
            <div class="mb-3">
                <p><strong>Địa chỉ giao hàng:</strong></p>
                <p>${order.address}</p>
            </div>
            
            ${order.note ? `
            <div class="mb-3">
                <p><strong>Ghi chú:</strong></p>
                <p>${order.note}</p>
            </div>
            ` : ''}
            
            <div class="mb-3">
                <p><strong>Phương thức thanh toán:</strong> ${order.payment_method_name}</p>
            </div>
            
            <h6 class="mb-3">Sản phẩm đã đặt:</h6>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="text-end"><strong>Tổng cộng:</strong></td>
                        <td><strong class="text-danger">${formatCurrency(order.total)}</strong></td>
                    </tr>
                </tfoot>
            </table>
        `;
        
        // Show in modal
        document.getElementById('orderDetailContent').innerHTML = modalContent;
        const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
        modal.show();
        
    } catch (error) {
        console.error('❌ Error loading order details:', error);
        showNotification('Không thể tải chi tiết đơn hàng!', 'error');
    }
}

// ==================== DELETE ORDER ====================
async function deleteOrder(orderId) {
    if (!confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    
    console.log('🗑️ Deleting order:', orderId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: orderId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Xóa đơn hàng thành công!', 'success');
            await loadOrdersFromAPI();
            loadOrdersTable();
            loadDashboard();
        } else {
            showNotification('Lỗi: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Error deleting order:', error);
        showNotification('Không thể xóa đơn hàng!', 'error');
    }
}

// ==================== LOAD REVIEWS TABLE ====================
function loadReviewsTable() {
    console.log('🔄 Loading reviews table...');
    const tbody = document.getElementById('reviewsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Chức năng đánh giá đang được phát triển</td></tr>';
}

// ==================== LOAD SETTINGS ====================
function loadSettings() {
    console.log('🔄 Loading settings...');
    // Settings functionality to be implemented
}

// ==================== MOBILE SIDEBAR ====================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function closeSidebarOnMobile() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
}

function closeSidebarOnOverlay() {
    closeSidebarOnMobile();
}

// ==================== SHOW SECTION ====================
function showSection(sectionName) {
    console.log(`🔄 Switching to section: ${sectionName}`);
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(`section-${sectionName}`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update active menu
    document.querySelectorAll('.sidebar-menu li a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Load data for specific sections
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'accessories':
            loadAccessoriesTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'customers':
            loadCustomersTable();
            break;
        case 'reviews':
            loadReviewsTable();
            break;
        case 'categories':
            loadCategoriesTable();
            break;
        case 'brands':
            loadBrandsTable();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// ==================== HELPER FUNCTIONS ====================
function viewCustomerDetails(customerId) {
    showNotification('Chức năng xem chi tiết khách hàng đang được phát triển', 'info');
}

function deleteCustomer(customerId) {
    if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
        showNotification('Chức năng xóa khách hàng đang được phát triển', 'warning');
    }
}

function editCategory(categoryId) {
    showNotification('Chức năng sửa danh mục đang được phát triển', 'info');
}

function editBrand(brandName) {
    showNotification('Chức năng sửa thương hiệu đang được phát triển', 'info');
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        alert(`Chi tiết đơn hàng #${orderId}\n\nKhách hàng: ${order.customerName}\nSố điện thoại: ${order.phone}\nTổng tiền: ${formatCurrency(order.total)}\nTrạng thái: ${order.status}`);
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    await loadDashboard();
    
    console.log('✅ Admin panel loaded with API');
    console.log('📊 Products:', products.length);
    console.log('📦 Orders:', orders.length);
});
