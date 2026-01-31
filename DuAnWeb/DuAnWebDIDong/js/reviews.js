// ==================== RATING FUNCTIONALITY ====================
function initRatingInput() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingValue = document.getElementById('ratingValue');

    ratingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            ratingValue.value = rating;

            // Update star display
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('mouseenter', () => {
            const rating = index + 1;
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Reset on mouse leave
    const ratingInput = document.querySelector('.rating-input');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingValue.value);
            ratingStars.forEach((s, i) => {
                if (i < currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    }
}

// ==================== CHECK USER PURCHASED PRODUCT ====================
function checkUserPurchasedProduct(email, productName) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Tìm đơn hàng của người dùng với email tương ứng
    // Kiểm tra cả email, customerEmail (từ checkout)
    const userOrders = orders.filter(order => {
        const orderEmail = order.email || order.customerEmail || '';
        const isUserOrder = orderEmail.toLowerCase() === email.toLowerCase();
        const isCompleted = order.status === 'Hoàn thành' || order.status === 'Đã giao';
        return isUserOrder && isCompleted;
    });
    
    // Nếu không có productName, chỉ cần kiểm tra có đơn hàng hoàn thành không
    if (!productName) {
        return userOrders.length > 0;
    }
    
    // Kiểm tra xem có mua sản phẩm cụ thể không
    for (let order of userOrders) {
        if (order.items && Array.isArray(order.items)) {
            const hasPurchased = order.items.some(item => 
                item.name && item.name.toLowerCase().includes(productName.toLowerCase())
            );
            if (hasPurchased) {
                return true;
            }
        }
    }
    
    return false;
}

// ==================== SUBMIT REVIEW ====================
function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const email = document.getElementById('reviewEmail').value.trim();
    const product = document.getElementById('reviewProduct').value.trim();
    const rating = document.getElementById('ratingValue').value;
    const content = document.getElementById('reviewContent').value.trim();

    // Validation
    if (!name || !email || !content) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'warning');
        return;
    }
    
    if (!product) {
        showNotification('Vui lòng chọn sản phẩm đã mua!', 'warning');
        return;
    }

    if (!rating || rating === '0') {
        showNotification('Vui lòng chọn số sao đánh giá!', 'warning');
        return;
    }
    
    // Kiểm tra người dùng đã mua sản phẩm chưa
    const hasPurchased = checkUserPurchasedProduct(email, product);
    
    if (!hasPurchased) {
        showNotification('Bạn chỉ có thể đánh giá sản phẩm đã mua! Vui lòng kiểm tra lại email và chọn đúng sản phẩm.', 'error');
        return;
    }

    // Create review object
    const review = {
        id: Date.now(),
        name: name,
        email: email,
        product: product,
        rating: parseInt(rating),
        content: content,
        date: new Date().toLocaleDateString('vi-VN'),
        status: 'pending' // pending, approved, rejected
    };

    // Lưu vào localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.unshift(review); // Thêm vào đầu
    localStorage.setItem('reviews', JSON.stringify(reviews));

    console.log('Review submitted:', review);

    // Không hiển thị đánh giá ngay lập tức, chờ admin duyệt
    // addReviewToList(review, true);

    // Show success message
    showNotification('Cảm ơn bạn đã gửi đánh giá! Đánh giá của bạn đang chờ admin duyệt và sẽ được hiển thị sau khi được phê duyệt.', 'success');

    // Reset form
    document.getElementById('reviewForm').reset();
    document.getElementById('ratingValue').value = '0';
    document.querySelectorAll('.rating-star').forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
    });
}

// ==================== ADD REVIEW TO LIST ====================
function addReviewToList(review, prepend = true) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    // Đảm bảo rating là số hợp lệ
    const rating = parseInt(review.rating) || 0;
    const starIcons = Array(rating).fill('<i class="fas fa-star"></i>').join('') +
                     Array(5 - rating).fill('<i class="far fa-star"></i>').join('');

    // Xác định thời gian hiển thị
    const timeDisplay = prepend ? 'Vừa xong' : (review.date || 'Không rõ');
    
    // Xác định trạng thái hiển thị
    const statusBadge = review.status === 'pending' 
        ? '<span class="badge bg-warning ms-2"><i class="fas fa-clock"></i> Đang chờ duyệt</span>' 
        : '';

    // Escape HTML để tránh XSS và giữ nguyên nội dung
    const escapeHtml = (text) => {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br>'); // Giữ xuống dòng
    };

    const reviewHTML = `
        <div class="review-card card mb-3 shadow-sm fade-in" data-review-id="${review.id || ''}">
            <div class="card-body">
                <div class="d-flex mb-3">
                    <div class="flex-shrink-0">
                        <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                            <i class="fas fa-user fa-2x"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h5 class="mb-1">${escapeHtml(review.name)}${statusBadge}</h5>
                        <div class="text-warning mb-1">
                            ${starIcons}
                        </div>
                        <p class="text-muted small mb-0">
                            <i class="fas fa-clock"></i> ${timeDisplay}${review.product ? ' | <i class="fas fa-mobile-alt"></i> ' + escapeHtml(review.product) : ''}
                        </p>
                    </div>
                </div>
                <p class="mb-2">${escapeHtml(review.content)}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fas fa-thumbs-up"></i> Hữu ích (0)
                    </button>
                    <button class="btn btn-sm btn-outline-secondary">
                        <i class="fas fa-reply"></i> Phản hồi
                    </button>
                </div>
            </div>
        </div>
    `;

    if (prepend) {
        reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
    } else {
        reviewsList.insertAdjacentHTML('beforeend', reviewHTML);
    }
}

// ==================== FILTER REVIEWS ====================
function filterReviews() {
    const filterSelect = document.getElementById('filterReviews');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', () => {
        const filterValue = filterSelect.value;
        const reviewCards = document.querySelectorAll('.review-card');

        reviewCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // In a real application, you would filter based on actual data
                card.style.display = 'block';
            }
        });
    });
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== LOAD APPROVED REVIEWS ====================
function loadApprovedReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    // Chỉ hiển thị đánh giá đã được admin duyệt
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    
    if (approvedReviews.length === 0) {
        // Giữ các đánh giá mẫu đã có trong HTML
        return;
    }
    
    // Xóa các đánh giá mẫu cũ trong HTML nếu có đánh giá thực
    reviewsList.innerHTML = '';
    
    // Thêm đánh giá vào danh sách
    approvedReviews.forEach(review => {
        addReviewToList(review, false);
    });
}

// ==================== UPDATE CART COUNT ====================
function updateCartCount() {
    const currentUser = sessionStorage.getItem('currentUser');
    let cartKey = 'cart_guest';
    if (currentUser) {
        const user = JSON.parse(currentUser);
        cartKey = `cart_${user.email}`;
    }
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = cartCount;
    });
}

// ==================== AUTO FILL USER INFO ====================
function autoFillUserInfo() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const nameInput = document.getElementById('reviewName');
        const emailInput = document.getElementById('reviewEmail');
        
        if (nameInput && user.name) {
            nameInput.value = user.name;
        }
        if (emailInput && user.email) {
            emailInput.value = user.email;
            // Tự động load sản phẩm đã mua
            loadUserPurchasedProducts(user.email);
        }
    }
}

// ==================== LOAD USER PURCHASED PRODUCTS ====================
function loadUserPurchasedProducts(email) {
    const productSelect = document.getElementById('reviewProduct');
    if (!productSelect || !email) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Lọc đơn hàng hoàn thành của user
    // Kiểm tra cả email, customerEmail (từ checkout)
    const completedOrders = orders.filter(order => {
        const orderEmail = order.email || order.customerEmail || '';
        const isUserOrder = orderEmail.toLowerCase() === email.toLowerCase();
        const isCompleted = order.status === 'Hoàn thành' || order.status === 'Đã giao';
        return isUserOrder && isCompleted;
    });
    
    // Lấy danh sách sản phẩm duy nhất
    const purchasedProducts = new Set();
    completedOrders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                if (item.name) {
                    purchasedProducts.add(item.name);
                }
            });
        }
    });
    
    // Cập nhật dropdown
    productSelect.innerHTML = '<option value="">-- Chọn sản phẩm đã mua --</option>';
    
    if (purchasedProducts.size === 0) {
        productSelect.innerHTML = '<option value="">Bạn chưa mua sản phẩm nào</option>';
        productSelect.disabled = true;
    } else {
        purchasedProducts.forEach(productName => {
            const option = document.createElement('option');
            option.value = productName;
            option.textContent = productName;
            productSelect.appendChild(option);
        });
        productSelect.disabled = false;
    }
}

// ==================== LISTEN EMAIL CHANGE ====================
function setupEmailListener() {
    const emailInput = document.getElementById('reviewEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                loadUserPurchasedProducts(email);
            }
        });
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    initRatingInput();
    filterReviews();
    loadApprovedReviews();
    updateCartCount();
    autoFillUserInfo();
    setupEmailListener();
});
