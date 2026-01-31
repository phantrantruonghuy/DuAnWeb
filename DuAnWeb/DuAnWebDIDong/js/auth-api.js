// ==================== API CONFIGURATION ====================
// Auto-detect API base URL
const API_BASE_URL = (() => {
    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;
    
    // Nếu đang chạy trên Docker (port 8080)
    if (window.location.port === '8080') {
        return `${baseUrl}/api`;
    }
    
    // Nếu đang chạy local với XAMPP
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

console.log('🔗 Auth API Base URL:', API_BASE_URL);

// ==================== USER AUTHENTICATION WITH API ====================

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
async function handleRegister(event) {
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
    
    try {
        console.log('🚀 Đang gọi API đăng ký...', {
            url: `${API_BASE_URL}/auth.php?action=register`,
            data: { name, email, phone }
        });
        
        // Gọi API đăng ký
        const response = await fetch(`${API_BASE_URL}/auth.php?action=register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                password: password
            })
        });
        
        const result = await response.json();
        console.log('✅ Kết quả từ API:', result);
        
        if (result.success) {
            alert(result.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
            
            // Chuyển sang tab đăng nhập
            document.getElementById('login-tab').click();
            document.getElementById('registerForm').reset();
        } else {
            alert(result.message || 'Đăng ký thất bại!');
        }
    } catch (error) {
        console.error('❌ Lỗi:', error);
        alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
    }
    
    return false;
}

// Đăng nhập
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    
    try {
        // Gọi API đăng nhập
        const response = await fetch(`${API_BASE_URL}/auth.php?action=login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Lưu thông tin đăng nhập
            sessionStorage.setItem('currentUser', JSON.stringify(result.data));
            
            if (remember) {
                localStorage.setItem('rememberedUser', JSON.stringify(result.data));
            }
            
            alert(result.message || 'Đăng nhập thành công!');
            
            // Chuyển về trang trước đó hoặc trang chủ
            const returnUrl = sessionStorage.getItem('returnUrl') || 'index.html';
            sessionStorage.removeItem('returnUrl');
            window.location.href = returnUrl;
        } else {
            alert(result.message || 'Đăng nhập thất bại!');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!');
    }
    
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
                const rememberCheckbox = document.getElementById('rememberMe');
                if (rememberCheckbox) {
                    rememberCheckbox.checked = true;
                }
            }
        }
    });
}
