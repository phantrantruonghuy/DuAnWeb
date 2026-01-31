// ==================== GET PRODUCT ID FROM URL ====================
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// ==================== LOAD PRODUCT DETAIL ====================
function loadProductDetail() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'sanpham.html';
        return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }

    // Update title
    document.title = `${product.name} - Thế Giới Di Động`;

    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }

    // Generate thumbnails (giới hạn tối đa 4 ảnh để tránh tràn)
    const thumbnails = document.querySelector('.image-thumbnails');
    if (thumbnails) {
        // Chỉ tạo tối đa 4 ảnh thumbnail
        const images = [product.image, product.image, product.image, product.image];
        thumbnails.innerHTML = images.slice(0, 4).map((img, index) => `
            <img src="${img}" 
                 alt="${product.name} - Ảnh ${index + 1}" 
                 class="${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${img}', this)"
                 loading="lazy">
        `).join('');
    }

    // Update product info
    const titleElement = document.getElementById('productTitle');
    if (titleElement) {
        titleElement.textContent = product.name;
    }

    const priceElement = document.getElementById('productPrice');
    if (priceElement) {
        priceElement.textContent = formatCurrency(product.price);
    }

    const oldPriceElement = document.getElementById('oldPrice');
    if (oldPriceElement && product.oldPrice) {
        oldPriceElement.textContent = formatCurrency(product.oldPrice);
    }

    const discountElement = document.getElementById('discount');
    if (discountElement && product.discount) {
        discountElement.textContent = `Giảm ${product.discount}%`;
    }

    // Update specs table
    const specsTable = document.getElementById('specsTable');
    if (specsTable && product.specs) {
        specsTable.innerHTML = Object.entries(product.specs).map(([key, value]) => `
            <tr>
                <td class="fw-bold" style="width: 30%;">${key}</td>
                <td>${value}</td>
            </tr>
        `).join('');
    }

    // Update description
    const descriptionElement = document.getElementById('productDescription');
    if (descriptionElement) {
        descriptionElement.innerHTML = `
            <p class="lead">${product.description}</p>
            <h5 class="mt-4">Đặc điểm nổi bật</h5>
            <ul>
                <li>Thiết kế sang trọng, tinh tế</li>
                <li>Hiệu năng mạnh mẽ, đa nhiệm mượt mà</li>
                <li>Camera chất lượng cao, chụp ảnh đẹp</li>
                <li>Pin trâu, sử dụng cả ngày</li>
                <li>Bảo hành chính hãng 12 tháng</li>
            </ul>
        `;
    }

    // Load related products
    loadRelatedProducts(product.brand, product.id);
}

// ==================== CHANGE MAIN IMAGE ====================
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }

    // Update active thumbnail
    document.querySelectorAll('.image-thumbnails img').forEach(img => {
        img.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// ==================== QUANTITY CONTROLS ====================
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// ==================== ADD TO CART ====================
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

function addToCart() {
    // Kiểm tra đăng nhập
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBạn có muốn chuyển đến trang đăng nhập không?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    const productId = getProductIdFromURL();
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    // Validate số lượng
    if (quantity <= 0) {
        alert('Số lượng phải lớn hơn 0!');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getUserCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveUserCart(cart);
    
    // Update cart count
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = cartCount;
    });

    showNotification(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, 'success');
}

// ==================== LOAD RELATED PRODUCTS ====================
function loadRelatedProducts(brand, excludeId) {
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;

    const relatedProducts = products
        .filter(p => p.brand === brand && p.id !== excludeId)
        .slice(0, 4);

    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p class="text-muted">Không có sản phẩm liên quan</p>';
        return;
    }

    relatedContainer.innerHTML = relatedProducts.map(product => renderProductCard(product)).join('');
}

// ==================== CHECK USER PURCHASED PRODUCT ====================
function checkUserPurchasedProduct(productId) {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        console.log('User not logged in');
        return false;
    }
    
    const user = JSON.parse(currentUser);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    console.log('Checking purchase for user:', user.email, 'Product ID:', productId);
    console.log('Total orders:', orders.length);
    
    // Kiểm tra xem user có đơn hàng hoàn thành chứa sản phẩm này không
    const hasPurchased = orders.some(order => {
        // Kiểm tra user (cả userId và email)
        const isUserOrder = (order.userId === user.id) || 
                           (order.email === user.email) || 
                           (order.customerEmail === user.email);
        
        // Kiểm tra status (Hoàn thành)
        const isCompleted = order.status === 'Hoàn thành';
        
        // Kiểm tra có sản phẩm trong đơn hàng
        const hasProduct = order.items && order.items.some(item => item.id === productId);
        
        if (isUserOrder && hasProduct) {
            console.log('Found order:', order.orderNumber, 'Status:', order.status, 'Has product:', hasProduct);
        }
        
        return isUserOrder && isCompleted && hasProduct;
    });
    
    console.log('Has purchased:', hasPurchased);
    return hasPurchased;
}

// ==================== LOAD PRODUCT REVIEWS ====================
function loadProductReviews(productId) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const productReviews = reviews.filter(r => r.productId === productId);
    
    if (productReviews.length === 0) {
        reviewsList.innerHTML = '<p class="text-muted">Chưa có đánh giá nào cho sản phẩm này.</p>';
        return;
    }
    
    // Sắp xếp theo ngày mới nhất
    productReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    reviewsList.innerHTML = productReviews.map(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewDate = new Date(review.date).toLocaleDateString('vi-VN');
        
        return `
            <div class="review-item mb-4 pb-4 border-bottom">
                <div class="d-flex mb-2">
                    <div class="flex-shrink-0">
                        <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-1">${review.name}</h6>
                        <div class="text-warning mb-1" style="font-size: 1.2rem;">
                            ${stars}
                        </div>
                        <p class="text-muted small mb-2">${reviewDate}</p>
                        <p>${review.comment}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== SETUP REVIEW SECTION ====================
function setupReviewSection(productId) {
    const reviewFormSection = document.getElementById('reviewFormSection');
    const notPurchasedMessage = document.getElementById('notPurchasedMessage');
    const currentUser = sessionStorage.getItem('currentUser');
    
    // Nếu chưa đăng nhập, chỉ hiện thông báo
    if (!currentUser) {
        reviewFormSection.style.display = 'none';
        notPurchasedMessage.style.display = 'none';
        loadProductReviews(productId);
        return;
    }
    
    const user = JSON.parse(currentUser);
    
    // Kiểm tra xem user đã mua sản phẩm chưa
    const hasPurchased = checkUserPurchasedProduct(productId);
    
    console.log('User:', user.email, 'Has purchased product', productId, ':', hasPurchased);
    
    if (hasPurchased) {
        reviewFormSection.style.display = 'block';
        notPurchasedMessage.style.display = 'none';
        console.log('Showing review form');
    } else {
        reviewFormSection.style.display = 'none';
        
        // Cập nhật thông báo với gợi ý
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const userOrders = orders.filter(o => 
            o.userId === user.id || o.email === user.email || o.customerEmail === user.email
        );
        const hasProduct = userOrders.some(o => o.items && o.items.some(i => i.id === productId));
        
        if (hasProduct) {
            // Có đơn hàng nhưng chưa hoàn thành
            const pendingOrder = userOrders.find(o => 
                o.items && o.items.some(i => i.id === productId) && o.status !== 'Hoàn thành'
            );
            if (pendingOrder) {
                notPurchasedMessage.innerHTML = `
                    <div class="alert alert-warning">
                        <i class="fas fa-clock"></i> Bạn có đơn hàng <strong>${pendingOrder.orderNumber}</strong> chứa sản phẩm này với trạng thái <strong>${pendingOrder.status}</strong>. 
                        Bạn có thể đánh giá khi đơn hàng <strong>Hoàn thành</strong>.
                    </div>
                `;
            }
        } else {
            notPurchasedMessage.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Bạn cần mua sản phẩm này trước khi có thể đánh giá.
                </div>
            `;
        }
        
        notPurchasedMessage.style.display = 'block';
        console.log('User has not purchased this product yet');
    }
    
    // Load danh sách đánh giá
    loadProductReviews(productId);
}

// ==================== SUBMIT PRODUCT REVIEW ====================
function submitProductReview(event) {
    event.preventDefault();
    
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Vui lòng đăng nhập để đánh giá!');
        return;
    }
    
    const user = JSON.parse(currentUser);
    const productId = getProductIdFromURL();
    
    // Kiểm tra lại xem đã mua chưa
    if (!checkUserPurchasedProduct(productId)) {
        alert('Bạn cần mua sản phẩm này trước khi đánh giá!');
        return;
    }
    
    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById('reviewComment').value;
    
    if (!rating) {
        alert('Vui lòng chọn số sao đánh giá!');
        return;
    }
    
    const review = {
        id: Date.now(),
        productId: productId,
        productName: products.find(p => p.id === productId)?.name || '',
        userId: user.id,
        name: user.name,
        email: user.email,
        rating: parseInt(rating.value),
        comment: comment,
        date: new Date().toISOString()
    };
    
    // Lưu đánh giá
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Reset form
    document.getElementById('productReviewForm').reset();
    
    // Reload reviews
    loadProductReviews(productId);
    
    alert('Cảm ơn bạn đã đánh giá sản phẩm!');
}

// ==================== LOAD RECOMMENDED ACCESSORIES ====================
function loadRecommendedAccessories() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const recommendedAccessories = getRecommendedAccessories(product.name, 4);
    const container = document.getElementById('recommendedAccessories');
    
    if (!container || recommendedAccessories.length === 0) return;
    
    container.innerHTML = `
        <div class="container my-5">
            <h3 class="mb-4"><i class="fas fa-gift"></i> Phụ kiện bạn có thể thích</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                ${recommendedAccessories.map(acc => renderAccessoryCard(acc)).join('')}
            </div>
        </div>
    `;
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
    updateCartCount();
    loadRecommendedAccessories();
    
    const productId = getProductIdFromURL();
    setupReviewSection(productId);
    
    // Setup form submit
    const reviewForm = document.getElementById('productReviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitProductReview);
    }
});
