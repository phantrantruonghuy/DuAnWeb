// ==================== USER ACCOUNT MANAGEMENT ====================

// Load thông tin user
async function loadUserInfo() {
    const user = requireLogin();
    if (!user) return;
    
    console.log('👤 Loading user info for:', user);
    
    try {
        // Lấy thông tin từ API
        const response = await fetch(`${API_BASE_URL}/users.php?id=${user.id}`);
        const result = await response.json();
        
        console.log('📥 User info response:', result);
        
        if (result.success && result.data) {
            const fullUser = result.data;
            
            document.getElementById('userName').textContent = fullUser.name;
            document.getElementById('userEmail').textContent = fullUser.email;
            
            // Load form profile
            document.getElementById('profileName').value = fullUser.name;
            document.getElementById('profileEmail').value = fullUser.email;
            document.getElementById('profilePhone').value = fullUser.phone || '';
            document.getElementById('profileBirthday').value = fullUser.birthday || '';
            document.getElementById('profileAddress').value = fullUser.address || '';
            
            console.log('✅ User info loaded successfully');
        } else {
            console.error('❌ Failed to load user info:', result.message);
        }
    } catch (error) {
        console.error('❌ Error loading user info:', error);
    }
}

// Load danh sách đơn hàng
async function loadUserOrders(filter = 'all') {
    const user = requireLogin();
    if (!user) return;
    
    console.log('📦 Loading orders for user:', user.id, 'Filter:', filter);
    
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '<div class="text-center py-5"><i class="fas fa-spinner fa-spin fa-3x text-primary"></i><p class="mt-3">Đang tải đơn hàng...</p></div>';
    
    try {
        // Lấy đơn hàng từ API
        const response = await fetch(`${API_BASE_URL}/orders.php?user_id=${user.id}`);
        const result = await response.json();
        
        console.log('📥 Orders response:', result);
        
        if (!result.success) {
            throw new Error(result.message || 'Không thể tải đơn hàng');
        }
        
        let orders = result.data || [];
        
        // Filter theo trạng thái
        if (filter !== 'all') {
            orders = orders.filter(o => o.status === filter);
        }
        
        console.log(`📊 Found ${orders.length} orders after filter`);
        
        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Bạn chưa có đơn hàng nào</p>
                    <a href="sanpham.html" class="btn btn-primary">Mua sắm ngay</a>
                </div>
            `;
            return;
        }
        
        const statusColors = {
            'Chờ xác nhận': 'warning',
            'Đã xác nhận': 'info',
            'Đang giao': 'primary',
            'Hoàn thành': 'success',
            'Đã hủy': 'danger'
        };
        
        let html = '';
        orders.forEach(order => {
            const createdDate = order.created_at || order.createdAt;
            
            html += `
                <div class="card mb-3 border">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h6 class="mb-1">Đơn hàng: <span class="text-primary">${order.order_number || order.orderNumber}</span></h6>
                                <small class="text-muted">${new Date(createdDate).toLocaleString('vi-VN')}</small>
                            </div>
                            <span class="badge bg-${statusColors[order.status] || 'secondary'} px-3 py-2">${order.status}</span>
                        </div>
                        
                        <div class="mb-3">
                            ${order.items.slice(0, 2).map(item => `
                                <div class="d-flex gap-2 mb-2">
                                    <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 50px; height: 50px; object-fit: contain;">
                                    <div class="flex-fill">
                                        <p class="mb-0 small">${item.name}</p>
                                        <small class="text-muted">x${item.quantity}</small>
                                    </div>
                                </div>
                            `).join('')}
                            ${order.items.length > 2 ? `<small class="text-muted">và ${order.items.length - 2} sản phẩm khác...</small>` : ''}
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center border-top pt-3">
                            <div>
                                <p class="mb-0">Tổng tiền: <strong class="text-danger fs-5">${formatCurrency(order.total)}</strong></p>
                                <small class="text-muted">${order.payment_method_name || order.paymentMethodName}</small>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewOrderDetail(${order.id})">
                                    <i class="fas fa-eye"></i> Chi tiết
                                </button>
                                ${order.status === 'Chờ xác nhận' ? `
                                    <button class="btn btn-sm btn-outline-danger" onclick="cancelOrder(${order.id})">
                                        <i class="fas fa-times"></i> Hủy đơn
                                    </button>
                                ` : ''}
                                ${order.status === 'Hoàn thành' ? `
                                    <button class="btn btn-sm btn-outline-success" onclick="reorder(${order.id})">
                                        <i class="fas fa-redo"></i> Mua lại
                                    </button>
                                    <a href="danhgia.html" class="btn btn-sm btn-warning">
                                        <i class="fas fa-star"></i> Đánh giá
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        ordersList.innerHTML = html;
        console.log('✅ Orders rendered successfully');
        
    } catch (error) {
        console.error('❌ Error loading orders:', error);
        ordersList.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i> 
                Không thể tải đơn hàng: ${error.message}
            </div>
        `;
    }
}

// Filter đơn hàng
function filterOrders(status) {
    // Cập nhật active button
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadUserOrders(status);
}

// Xem chi tiết đơn hàng
async function viewOrderDetail(orderId) {
    console.log('🔍 Loading order detail:', orderId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php?id=${orderId}`);
        const result = await response.json();
        
        if (!result.success || !result.data) {
            alert('Không thể tải chi tiết đơn hàng');
            return;
        }
        
        const order = result.data;
        console.log('📥 Order detail:', order);
    
        const statusColors = {
            'Chờ xác nhận': 'warning',
            'Đã xác nhận': 'info',
            'Đang giao': 'primary',
            'Hoàn thành': 'success',
            'Đã hủy': 'danger'
        };
        
        const createdDate = order.created_at || order.createdAt;
        const orderNumber = order.order_number || order.orderNumber;
        const customerName = order.customer_name || order.customerName;
        const customerPhone = order.customer_phone || order.customerPhone;
        const customerEmail = order.customer_email || order.customerEmail;
        const paymentMethodName = order.payment_method_name || order.paymentMethodName;
        
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div class="d-flex gap-3 mb-3 pb-3 border-bottom">
                    <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 80px; height: 80px; object-fit: contain;">
                    <div class="flex-fill">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted small mb-1">Số lượng: ${item.quantity}</p>
                        <p class="text-danger fw-bold mb-0">${formatCurrency(item.price * item.quantity)}</p>
                        ${order.status === 'Hoàn thành' ? `
                            <a href="danhgia.html" class="btn btn-sm btn-warning mt-2">
                                <i class="fas fa-star"></i> Đánh giá sản phẩm
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        
        const content = `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6>Đơn hàng: <span class="text-primary">${orderNumber}</span></h6>
                    <span class="badge bg-${statusColors[order.status] || 'secondary'} px-3 py-2">${order.status}</span>
                </div>
                <p class="text-muted small mb-0">Đặt ngày: ${new Date(createdDate).toLocaleString('vi-VN')}</p>
            </div>
            
            <div class="bg-light p-3 rounded mb-3">
                <h6 class="mb-2">Thông tin nhận hàng</h6>
                <p class="mb-1"><strong>Người nhận:</strong> ${customerName}</p>
                <p class="mb-1"><strong>Số điện thoại:</strong> ${customerPhone}</p>
                <p class="mb-1"><strong>Email:</strong> ${customerEmail || 'Không có'}</p>
                <p class="mb-0"><strong>Địa chỉ:</strong> ${order.address}</p>
                ${order.note ? `<p class="mb-0 mt-2"><strong>Ghi chú:</strong> ${order.note}</p>` : ''}
            </div>
            
            <h6 class="mb-3">Sản phẩm</h6>
            ${itemsHtml}
            
            <div class="border-top pt-3">
                <div class="d-flex justify-content-between mb-2">
                    <span>Tạm tính:</span>
                    <span class="fw-bold">${formatCurrency(order.subtotal)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Phí vận chuyển:</span>
                    <span class="text-success fw-bold">Miễn phí</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <span>Thanh toán:</span>
                    <span>${paymentMethodName}</span>
                </div>
                <div class="border-top pt-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Tổng cộng:</h5>
                    <h4 class="mb-0 text-danger fw-bold">${formatCurrency(order.total)}</h4>
                </div>
            </div>
        `;
        
        document.getElementById('orderDetailContent').innerHTML = content;
        
        const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
        modal.show();
        
    } catch (error) {
        console.error('❌ Error loading order detail:', error);
        alert('Không thể tải chi tiết đơn hàng');
    }
}

// Hủy đơn hàng
async function cancelOrder(orderId) {
    if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;
    
    console.log('❌ Canceling order:', orderId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: orderId,
                status: 'Đã hủy'
            })
        });
        
        const result = await response.json();
        console.log('📥 Cancel response:', result);
        
        if (result.success) {
            showNotification('Đã hủy đơn hàng thành công!', 'success');
            loadUserOrders('all');
        } else {
            alert('Không thể hủy đơn hàng: ' + result.message);
        }
    } catch (error) {
        console.error('❌ Error canceling order:', error);
        alert('Không thể hủy đơn hàng!');
    }
}

// Mua lại
async function reorder(orderId) {
    console.log('🔄 Reordering:', orderId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php?id=${orderId}`);
        const result = await response.json();
        
        if (!result.success || !result.data) {
            alert('Không thể tải đơn hàng');
            return;
        }
        
        const order = result.data;
        
        // Thêm sản phẩm vào giỏ hàng
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        order.items.forEach(item => {
            const existingItem = cart.find(c => c.id == item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity
                });
            }
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
        
        setTimeout(() => {
            window.location.href = 'giohang.html';
        }, 1000);
    } catch (error) {
        console.error('❌ Error reordering:', error);
        alert('Không thể mua lại đơn hàng!');
    }
}

// Cập nhật thông tin cá nhân
function updateProfile(event) {
    event.preventDefault();
    
    const user = requireLogin();
    if (!user) return;
    
    const name = document.getElementById('profileName').value;
    const phone = document.getElementById('profilePhone').value;
    const birthday = document.getElementById('profileBirthday').value;
    const address = document.getElementById('profileAddress').value;
    
    // Cập nhật trong users
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].phone = phone;
        users[userIndex].birthday = birthday;
        users[userIndex].address = address;
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // Cập nhật session
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        currentUser.name = name;
        currentUser.phone = phone;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Đồng bộ với customers cho admin quản lý
        syncUserToCustomers(users[userIndex]);
        
        showNotification('Cập nhật thông tin thành công!', 'success');
        loadUserInfo();
    }
    
    return false;
}

// Đổi mật khẩu
function changePassword(event) {
    event.preventDefault();
    
    const user = requireLogin();
    if (!user) return;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Kiểm tra mật khẩu mới khớp
    if (newPassword !== confirmNewPassword) {
        alert('Mật khẩu mới không khớp!');
        return false;
    }
    
    // Lấy user từ localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        // Kiểm tra mật khẩu hiện tại
        if (users[userIndex].password !== currentPassword) {
            alert('Mật khẩu hiện tại không đúng!');
            return false;
        }
        
        // Cập nhật mật khẩu mới
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Đổi mật khẩu thành công!', 'success');
        document.getElementById('passwordForm').reset();
    }
    
    return false;
}

// Đồng bộ user với customers cho admin
function syncUserToCustomers(user) {
    let customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customerIndex = customers.findIndex(c => c.id === user.id || c.email === user.email);
    
    if (customerIndex !== -1) {
        // Cập nhật customer đã tồn tại
        customers[customerIndex].name = user.name;
        customers[customerIndex].phone = user.phone;
        customers[customerIndex].email = user.email;
        customers[customerIndex].address = user.address || '';
    } else {
        // Tạo customer mới
        customers.push({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address || '',
            orders: 0,
            registerDate: new Date().toLocaleDateString('vi-VN')
        });
    }
    
    localStorage.setItem('customers', JSON.stringify(customers));
}

// Notification helper
function showNotification(message, type = 'success') {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Khởi tạo
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('ordersList')) {
            loadUserInfo();
            loadUserOrders('all');
        }
    });
}
