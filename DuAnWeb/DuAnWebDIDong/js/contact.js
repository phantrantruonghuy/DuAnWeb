// ==================== SUBMIT CONTACT FORM ====================
function submitContact(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const agree = document.getElementById('agree').checked;

    // Validation
    if (!name || !phone || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'warning');
        return;
    }

    if (!agree) {
        showNotification('Vui lòng đồng ý với điều khoản sử dụng!', 'warning');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Email không hợp lệ!', 'warning');
        return;
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Số điện thoại phải có đúng 10 chữ số!', 'warning');
        return;
    }

    // Create contact object
    const contact = {
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    };

    // In a real application, this would be sent to a server
    console.log('Contact form submitted:', contact);

    // Show success message
    showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');

    // Reset form
    document.getElementById('contactForm').reset();
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ==================== UPDATE CART COUNT ====================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = cartCount;
    });
}

// ==================== ANIMATE ON SCROLL ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .contact-info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    animateOnScroll();
});
