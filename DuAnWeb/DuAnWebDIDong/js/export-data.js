// ==================== EXPORT ALL LOCALSTORAGE DATA ====================
// Script để lấy toàn bộ dữ liệu localStorage của dự án

/**
 * Danh sách tất cả các key localStorage được sử dụng trong dự án:
 * 
 * 1. products - Danh sách sản phẩm
 * 2. orders - Danh sách đơn hàng
 * 3. users - Danh sách tài khoản người dùng
 * 4. customers - Danh sách khách hàng (cho admin)
 * 5. reviews - Danh sách đánh giá sản phẩm
 * 6. banners - Danh sách banner quảng cáo
 * 7. categories - Danh sách danh mục sản phẩm
 * 8. brands - Danh sách thương hiệu
 * 9. paymentMethods - Phương thức thanh toán
 * 10. vouchers - Mã giảm giá
 * 11. settings - Cài đặt hệ thống
 * 12. rememberedUser - Thông tin user đã remember login
 * 13. cart_[email] - Giỏ hàng theo từng user (dynamic key)
 * 14. cart_guest - Giỏ hàng khách vãng lai
 */

// Hàm chuyển đổi URL ảnh thành Base64
async function imageUrlToBase64(url) {
    try {
        // Nếu đã là base64 thì return luôn
        if (url && url.startsWith('data:')) {
            return url;
        }
        
        // Nếu là ảnh local
        if (url && (url.startsWith('images/') || url.startsWith('./images/'))) {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = () => resolve(url); // Giữ URL gốc nếu lỗi
                reader.readAsDataURL(blob);
            });
        }
        
        // Với URL bên ngoài, thử fetch qua proxy hoặc trực tiếp
        const response = await fetch(url, { mode: 'cors' });
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(url);
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn('Không thể chuyển đổi ảnh:', url, error.message);
        return url; // Giữ URL gốc nếu không thể chuyển đổi
    }
}

// Hàm chuyển đổi tất cả ảnh trong data thành Base64
async function convertAllImagesToBase64(data, progressCallback) {
    const result = JSON.parse(JSON.stringify(data)); // Deep clone
    let processed = 0;
    let total = 0;
    
    // Đếm tổng số ảnh cần xử lý
    if (result.products) total += result.products.length;
    if (result.accessories) total += result.accessories.length;
    if (result.banners) total += result.banners.length;
    if (result.brands) total += result.brands.length;
    
    // Chuyển đổi ảnh products
    if (result.products && Array.isArray(result.products)) {
        for (let i = 0; i < result.products.length; i++) {
            if (result.products[i].image) {
                result.products[i].image = await imageUrlToBase64(result.products[i].image);
            }
            processed++;
            if (progressCallback) progressCallback(processed, total, 'products');
        }
    }
    
    // Chuyển đổi ảnh accessories
    if (result.accessories && Array.isArray(result.accessories)) {
        for (let i = 0; i < result.accessories.length; i++) {
            if (result.accessories[i].image) {
                result.accessories[i].image = await imageUrlToBase64(result.accessories[i].image);
            }
            processed++;
            if (progressCallback) progressCallback(processed, total, 'accessories');
        }
    }
    
    // Chuyển đổi ảnh banners
    if (result.banners && Array.isArray(result.banners)) {
        for (let i = 0; i < result.banners.length; i++) {
            if (result.banners[i].image) {
                result.banners[i].image = await imageUrlToBase64(result.banners[i].image);
            }
            processed++;
            if (progressCallback) progressCallback(processed, total, 'banners');
        }
    }
    
    // Chuyển đổi logo brands
    if (result.brands && Array.isArray(result.brands)) {
        for (let i = 0; i < result.brands.length; i++) {
            if (result.brands[i].logo) {
                result.brands[i].logo = await imageUrlToBase64(result.brands[i].logo);
            }
            processed++;
            if (progressCallback) progressCallback(processed, total, 'brands');
        }
    }
    
    return result;
}

// Hàm lấy toàn bộ dữ liệu localStorage
function getAllLocalStorageData() {
    const allKeys = [
        'products',
        'accessories',
        'orders', 
        'users',
        'customers',
        'reviews',
        'banners',
        'categories',
        'brands',
        'paymentMethods',
        'vouchers',
        'settings',
        'rememberedUser',
        'cart_guest'
    ];
    
    const data = {};
    
    // Lấy dữ liệu từ các key cố định
    allKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                data[key] = JSON.parse(value);
            } catch (e) {
                data[key] = value;
            }
        }
    });
    
    // Lấy tất cả cart của các user (cart_xxx)
    const cartKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cart_') && key !== 'cart_guest') {
            cartKeys.push(key);
        }
    }
    
    if (cartKeys.length > 0) {
        data.userCarts = {};
        cartKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    data.userCarts[key] = JSON.parse(value);
                } catch (e) {
                    data.userCarts[key] = value;
                }
            }
        });
    }
    
    return data;
}

// Hàm export dữ liệu ra file JSON (không kèm ảnh)
function exportToJSON() {
    const data = getAllLocalStorageData();
    
    // Thêm metadata
    const exportData = {
        exportDate: new Date().toISOString(),
        exportDateVN: new Date().toLocaleString('vi-VN'),
        projectName: 'DuAnWebDIDong',
        totalKeys: Object.keys(data).length,
        includesImages: false,
        data: data
    };
    
    // Tạo file và download
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `localstorage-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ Đã export dữ liệu localStorage thành công!');
    console.log('📊 Tổng số key:', Object.keys(data).length);
    
    return exportData;
}

// Hàm export dữ liệu kèm ảnh (chuyển ảnh thành Base64)
async function exportWithImages(progressCallback) {
    const data = getAllLocalStorageData();
    
    console.log('🖼️ Đang chuyển đổi ảnh thành Base64...');
    
    // Chuyển đổi tất cả ảnh thành Base64
    const dataWithImages = await convertAllImagesToBase64(data, progressCallback);
    
    // Thêm metadata
    const exportData = {
        exportDate: new Date().toISOString(),
        exportDateVN: new Date().toLocaleString('vi-VN'),
        projectName: 'DuAnWebDIDong',
        totalKeys: Object.keys(dataWithImages).length,
        includesImages: true,
        data: dataWithImages
    };
    
    // Tạo file và download
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-with-images-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ Đã export dữ liệu kèm ảnh thành công!');
    console.log('📊 Tổng số key:', Object.keys(dataWithImages).length);
    
    return exportData;
}

// Hàm hiển thị dữ liệu ra console
function showAllData() {
    const data = getAllLocalStorageData();
    
    console.log('==================== DỮ LIỆU LOCALSTORAGE ====================');
    console.log('📅 Thời gian:', new Date().toLocaleString('vi-VN'));
    console.log('');
    
    Object.keys(data).forEach(key => {
        const value = data[key];
        const count = Array.isArray(value) ? value.length : (typeof value === 'object' ? Object.keys(value).length : 1);
        console.log(`📁 ${key}: ${count} ${Array.isArray(value) ? 'items' : 'entries'}`);
    });
    
    console.log('');
    console.log('📋 Chi tiết dữ liệu:');
    console.log(JSON.stringify(data, null, 2));
    
    return data;
}

// Hàm import dữ liệu từ JSON
function importFromJSON(jsonData) {
    try {
        const importData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        const data = importData.data || importData;
        
        let importedCount = 0;
        
        Object.keys(data).forEach(key => {
            if (key === 'userCarts' && typeof data[key] === 'object') {
                // Import các cart của user
                Object.keys(data[key]).forEach(cartKey => {
                    localStorage.setItem(cartKey, JSON.stringify(data[key][cartKey]));
                    importedCount++;
                });
            } else {
                localStorage.setItem(key, JSON.stringify(data[key]));
                importedCount++;
            }
        });
        
        console.log(`✅ Đã import ${importedCount} key vào localStorage!`);
        return true;
    } catch (e) {
        console.error('❌ Lỗi khi import:', e);
        return false;
    }
}

// Hàm lấy thống kê dữ liệu
function getDataStats() {
    const data = getAllLocalStorageData();
    
    const stats = {
        products: data.products ? data.products.length : 0,
        accessories: data.accessories ? data.accessories.length : 0,
        orders: data.orders ? data.orders.length : 0,
        users: data.users ? data.users.length : 0,
        customers: data.customers ? data.customers.length : 0,
        reviews: data.reviews ? data.reviews.length : 0,
        banners: data.banners ? data.banners.length : 0,
        categories: data.categories ? data.categories.length : 0,
        brands: data.brands ? data.brands.length : 0,
        paymentMethods: data.paymentMethods ? data.paymentMethods.length : 0,
        vouchers: data.vouchers ? data.vouchers.length : 0,
        hasSettings: !!data.settings,
        userCartsCount: data.userCarts ? Object.keys(data.userCarts).length : 0
    };
    
    console.table(stats);
    return stats;
}

// Export functions để sử dụng
window.exportLocalStorage = {
    getAll: getAllLocalStorageData,
    export: exportToJSON,
    exportWithImages: exportWithImages,
    convertImagesToBase64: convertAllImagesToBase64,
    imageToBase64: imageUrlToBase64,
    show: showAllData,
    import: importFromJSON,
    stats: getDataStats
};

console.log('📦 Export LocalStorage Module đã sẵn sàng!');
console.log('Sử dụng:');
console.log('  - exportLocalStorage.getAll()  : Lấy toàn bộ dữ liệu');
console.log('  - exportLocalStorage.export()  : Download file JSON (không kèm ảnh)');
console.log('  - exportLocalStorage.exportWithImages() : Download file JSON kèm ảnh Base64');
console.log('  - exportLocalStorage.show()    : Hiển thị dữ liệu trong console');
console.log('  - exportLocalStorage.stats()   : Xem thống kê');
console.log('  - exportLocalStorage.import(json) : Import dữ liệu từ JSON');
