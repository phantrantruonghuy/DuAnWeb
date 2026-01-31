// ==================== CHECKOUT & ORDER MANAGEMENT ====================
// API_BASE_URL đã được khai báo trong main-api.js

// Hàm lấy cart key theo user
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

function clearUserCart() {
    const cartKey = getCartKey();
    localStorage.removeItem(cartKey);
}

// Load thông tin giỏ hàng khi vào trang checkout
function loadCheckoutSummary() {
    const cart = getUserCart();
    const orderSummary = document.getElementById('orderSummary');
    
    if (!orderSummary) return;
    
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p class="text-muted">Giỏ hàng trống</p>';
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="d-flex gap-3 mb-3 pb-3 border-bottom">
                <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 60px; height: 60px; object-fit: contain;">
                <div class="flex-fill">
                    <h6 class="mb-1">${item.name}</h6>
                    <p class="text-muted small mb-1">x${item.quantity}</p>
                    <p class="text-danger fw-bold mb-0">${formatCurrency(itemTotal)}</p>
                </div>
            </div>
        `;
    });
    
    orderSummary.innerHTML = html;
    
    // Cập nhật tổng tiền
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('totalAmount').textContent = formatCurrency(subtotal);
    
    // Load thông tin user nếu đã đăng nhập
    const user = checkLogin();
    if (user) {
        document.getElementById('customerName').value = user.name || '';
        document.getElementById('customerEmail').value = user.email || '';
        document.getElementById('customerPhone').value = user.phone || '';
    }
}

// Đặt hàng
async function placeOrder() {
    // Kiểm tra đăng nhập
    const user = requireLogin();
    if (!user) return;
    
    // Validate form
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Lấy giỏ hàng
    const cart = getUserCart();
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    // Lấy thông tin đơn hàng
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerCity = document.getElementById('customerCity').value;
    const customerDistrict = document.getElementById('customerDistrict').value;
    const customerWard = document.getElementById('customerWard').value;
    const orderNote = document.getElementById('orderNote').value;
    
    // Validate số điện thoại
    if (!/^[0-9]{10}$/.test(customerPhone)) {
        alert('Số điện thoại phải có đúng 10 chữ số!');
        return;
    }
    
    // Validate email nếu có nhập
    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const paymentNames = {
        'cod': 'Thanh toán khi nhận hàng',
        'banking': 'Chuyển khoản ngân hàng',
        'momo': 'Ví MoMo',
        'card': 'Thẻ tín dụng/ghi nợ'
    };
    
    // Tính tổng tiền
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    // Tạo đơn hàng
    const orderData = {
        userId: user.id,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        address: `${customerAddress}, ${customerWard}, ${customerDistrict}, ${customerCity}`,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
        })),
        subtotal: total,
        shippingFee: 0,
        discount: 0,
        total: total,
        paymentMethod: paymentMethod,
        paymentMethodName: paymentNames[paymentMethod],
        note: orderNote
    };
    
    try {
        // Gọi API để lưu đơn hàng
        console.log('🛒 Placing order with API_BASE_URL:', API_BASE_URL);
        console.log('📦 Order data:', orderData);
        
        const response = await fetch(`${API_BASE_URL}/orders.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('📥 Response status:', response.status);
        
        // Lấy response text để debug
        const responseText = await response.text();
        console.log('📄 Response text:', responseText);
        
        // Parse JSON
        const result = JSON.parse(responseText);
        console.log('📊 API result:', result);
        
        if (result.success) {
            // Xóa giỏ hàng của user
            clearUserCart();
            
            // Chuyển đến trang xác nhận
            sessionStorage.setItem('lastOrderId', result.data.id);
            sessionStorage.setItem('lastOrderNumber', result.data.orderNumber);
            window.location.href = 'order-success.html';
        } else {
            alert('Đặt hàng thất bại: ' + result.message);
        }
    } catch (error) {
        console.error('❌ Error placing order:', error);
        alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    }
}

// Load trang thành công
async function loadOrderSuccess() {
    const orderId = sessionStorage.getItem('lastOrderId');
    const orderNumber = sessionStorage.getItem('lastOrderNumber');
    
    console.log('📦 Loading order success page, orderId:', orderId, 'orderNumber:', orderNumber);
    
    if (!orderId) {
        console.log('⚠️ No orderId found, redirecting to index');
        window.location.href = 'index.html';
        return;
    }
    
    try {
        // Load order from API
        const response = await fetch(`${API_BASE_URL}/orders.php?id=${orderId}`);
        const data = await response.json();
        
        console.log('📊 Order API response:', data);
        
        if (!data.success || !data.data) {
            console.log('⚠️ Order not found, redirecting to index');
            window.location.href = 'index.html';
            return;
        }
        
        const order = data.data;
        console.log('✅ Order loaded:', order);
        
        const container = document.getElementById('orderSuccessDetails');
        if (!container) return;
        
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div class="d-flex gap-3 mb-3 pb-3 border-bottom">
                    <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 60px; height: 60px; object-fit: contain;">
                    <div class="flex-fill">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted small mb-1">Số lượng: ${item.quantity}</p>
                        <p class="text-danger fw-bold mb-0">${formatCurrency(item.price * item.quantity)}</p>
                    </div>
                </div>
            `;
        });
        
        const createdDate = order.created_at || order.createdAt;
        const orderNum = order.order_number || order.orderNumber;
        const customerName = order.customer_name || order.customerName;
        const customerPhone = order.customer_phone || order.customerPhone;
        const paymentMethodName = order.payment_method_name || order.paymentMethodName;
        
        container.innerHTML = `
            <div class="card shadow-sm border-0 rounded-3">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <div class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                            <i class="fas fa-check fa-3x"></i>
                        </div>
                        <h3 class="text-success mb-2">Đặt hàng thành công!</h3>
                        <p class="text-muted">Cảm ơn bạn đã mua hàng tại Thế Giới Di Động</p>
                    </div>
                    
                    <div class="bg-light p-3 rounded-3 mb-4">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <strong>Mã đơn hàng:</strong>
                                <span class="text-primary">${orderNum}</span>
                            </div>
                            <div class="col-md-6 mb-2">
                                <strong>Ngày đặt:</strong>
                                <span>${new Date(createdDate).toLocaleString('vi-VN')}</span>
                            </div>
                            <div class="col-md-6 mb-2">
                                <strong>Trạng thái:</strong>
                                <span class="badge bg-warning">${order.status}</span>
                            </div>
                            <div class="col-md-6 mb-2">
                                <strong>Thanh toán:</strong>
                                <span>${paymentMethodName}</span>
                            </div>
                        </div>
                    </div>
                    
                    <h5 class="mb-3 border-bottom pb-2">Thông tin nhận hàng</h5>
                    <div class="mb-4">
                        <p class="mb-1"><strong>Người nhận:</strong> ${customerName}</p>
                        <p class="mb-1"><strong>Số điện thoại:</strong> ${customerPhone}</p>
                        <p class="mb-1"><strong>Địa chỉ:</strong> ${order.address}</p>
                    </div>
                    
                    <h5 class="mb-3 border-bottom pb-2">Sản phẩm đã đặt</h5>
                    <div class="mb-4">
                        ${itemsHtml}
                    </div>
                    
                    <div class="border-top pt-3">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Tạm tính:</span>
                            <span class="fw-bold">${formatCurrency(order.subtotal)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Phí vận chuyển:</span>
                            <span class="text-success fw-bold">Miễn phí</span>
                        </div>
                        <div class="border-top pt-3 d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Tổng cộng:</h5>
                            <h4 class="mb-0 text-danger fw-bold">${formatCurrency(order.total)}</h4>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-4">
                        <i class="fas fa-info-circle"></i> 
                        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
                    </div>
                    
                    <div class="d-grid gap-2 mt-4">
                        <a href="account.html" class="btn btn-primary">
                            <i class="fas fa-list"></i> Xem đơn hàng của tôi
                        </a>
                        <a href="index.html" class="btn btn-outline-secondary">
                            <i class="fas fa-home"></i> Về trang chủ
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Xóa session
        sessionStorage.removeItem('lastOrderId');
        sessionStorage.removeItem('lastOrderNumber');
        
    } catch (error) {
        console.error('❌ Error loading order:', error);
        alert('Có lỗi khi tải thông tin đơn hàng');
    }
}

// Khởi tạo
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Nếu ở trang checkout
        if (document.getElementById('checkoutForm')) {
            // Kiểm tra đăng nhập
            const user = requireLogin();
            if (user) {
                loadCheckoutSummary();
            }
        }
        
        // Nếu ở trang order success
        if (document.getElementById('orderSuccessDetails')) {
            loadOrderSuccess();
        }
    });
}
