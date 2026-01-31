// ==================== USER AUTHENTICATION ====================

// Toggle hiển thị mật khẩu
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Đăng ký tài khoản
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validate tên không được rỗng
    if (!name || name.trim() === '') {
        alert('Vui lòng nhập họ tên!');
        return false;
    }
    
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email không hợp lệ!');
        return false;
    }
    
    // Validate số điện thoại
    if (!/^[0-9]{10}$/.test(phone)) {
        alert('Số điện thoại phải có đúng 10 chữ số!');
        return false;
    }
    
    // Validate mật khẩu tối thiểu 6 ký tự
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return false;
    }
    
    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return false;
    }
    
    // Lấy danh sách users
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra email đã tồn tại
    if (users.find(u => u.email === email)) {
        alert('Email này đã được đăng ký!');
        return false;
    }
    
    // Kiểm tra số điện thoại đã tồn tại
    if (users.find(u => u.phone === phone)) {
        alert('Số điện thoại này đã được đăng ký!');
        return false;
    }
    
    // Tạo user mới
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        address: '',
        createdAt: new Date().toISOString(),
        role: 'user' // user hoặc admin
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Đồng bộ dữ liệu khách hàng cho admin quản lý
    let customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const newCustomer = {
        id: newUser.id,
        name: name,
        email: email,
        phone: phone,
        address: '',
        orders: 0,
        registerDate: new Date().toLocaleDateString('vi-VN')
    };
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    
    // Chuyển sang tab đăng nhập
    document.getElementById('login-tab').click();
    document.getElementById('registerForm').reset();
    
    return false;
}

// Đăng nhập
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    
    // Lấy danh sách users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Tìm user theo email hoặc phone
    const user = users.find(u => 
        (u.email === username || u.phone === username) && u.password === password
    );
    
    if (!user) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        return false;
    }
    
    // Lưu thông tin đăng nhập
    const loginData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(loginData));
    
    if (remember) {
        localStorage.setItem('rememberedUser', JSON.stringify(loginData));
    }
    
    alert('Đăng nhập thành công!');
    
    // Chuyển về trang trước đó hoặc trang chủ
    const returnUrl = sessionStorage.getItem('returnUrl') || 'index.html';
    sessionStorage.removeItem('returnUrl');
    window.location.href = returnUrl;
    
    return false;
}

// Đăng xuất
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'index.html';
    }
}

// Kiểm tra đăng nhập
function checkLogin() {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Yêu cầu đăng nhập
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

// Cập nhật hiển thị user trên header
function updateUserDisplay() {
    const user = checkLogin();
    const accountLink = document.getElementById('userAccountLink');
    
    if (accountLink) {
        if (user) {
            // Đã đăng nhập - hiển thị tên và dropdown menu
            accountLink.href = 'account.html';
            accountLink.innerHTML = `<i class="fas fa-user-circle"></i> ${user.name}`;
            
            // Thêm dropdown menu nếu chưa có
            const headerActions = accountLink.closest('.header-actions');
            let logoutLink = headerActions.querySelector('.logout-link');
            
            if (!logoutLink) {
                logoutLink = document.createElement('a');
                logoutLink.href = '#';
                logoutLink.className = 'text-decoration-none text-danger logout-link';
                logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Đăng xuất';
                logoutLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
                
                // Thêm sau account link
                accountLink.parentNode.insertBefore(logoutLink, accountLink.nextSibling);
            }
        } else {
            // Chưa đăng nhập - hiển thị nút đăng nhập
            accountLink.href = 'login.html';
            accountLink.innerHTML = '<i class="fas fa-user"></i> Đăng nhập';
            
            // Xóa nút đăng xuất nếu có
            const headerActions = accountLink.closest('.header-actions');
            const logoutLink = headerActions.querySelector('.logout-link');
            if (logoutLink) {
                logoutLink.remove();
            }
        }
    }
}

// Khởi tạo khi load trang
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        updateUserDisplay();
        
        // Auto-fill nếu đã remember
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser && !sessionStorage.getItem('currentUser')) {
            const userData = JSON.parse(rememberedUser);
            const loginUsername = document.getElementById('loginUsername');
            if (loginUsername) {
                loginUsername.value = userData.email;
                document.getElementById('rememberMe').checked = true;
            }
        }
    });
}
