// ==================== PRODUCT DATA ====================
// Load products from localStorage if available, otherwise use default data
let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: 1,
        name: 'iPhone 15 Pro Max 256GB',
        brand: 'Apple',
        price: 29990000,
        oldPrice: 34990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 5,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.7", Super Retina XDR',
            'Camera sau': '48MP, 12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A17 Pro',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '4422mAh, 20W'
        },
        description: 'iPhone 15 Pro Max mang đến thiết kế khung viền từ titan chuẩn hàng không vũ trụ, cực nhẹ và bền bỉ, đi kèm với đó là nút bấm Action Button tinh tế cùng hiệu năng cực đỉnh từ chip A17 Pro.'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra 5G 256GB',
        brand: 'Samsung',
        price: 27490000,
        oldPrice: 29990000,
        discount: 8,
        image: 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.8", Dynamic AMOLED 2X',
            'Camera sau': '200MP, 50MP, 12MP, 10MP',
            'Camera trước': '12MP',
            'CPU': 'Snapdragon 8 Gen 3',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 45W'
        },
        description: 'Galaxy S24 Ultra mang đến khả năng chụp ảnh zoom 100x ấn tượng, hiệu năng mạnh mẽ cùng Galaxy AI thông minh.'
    },
    {
        id: 3,
        name: 'Xiaomi 14 Ultra 5G 512GB',
        brand: 'Xiaomi',
        price: 24990000,
        oldPrice: 27990000,
        discount: 11,
        image: 'https://cdn.tgdd.vn/Products/Images/42/320722/xiaomi-14-ultra-white-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 16,
        storage: 512,
        rating: 5,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.73", AMOLED',
            'Camera sau': '50MP, 50MP, 50MP, 50MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 8 Gen 3',
            'RAM': '16GB',
            'Bộ nhớ trong': '512GB',
            'Pin': '5000mAh, 90W'
        },
        description: 'Xiaomi 14 Ultra với hệ thống camera Leica 4 ống kính 50MP, hiệu năng đỉnh cao và sạc nhanh 90W ấn tượng.'
    },
    {
        id: 4,
        name: 'OPPO Reno11 F 5G 8GB',
        brand: 'OPPO',
        price: 8490000,
        oldPrice: 9990000,
        discount: 15,
        image: 'https://cdn.tgdd.vn/Products/Images/42/320536/oppo-reno11-f-5g-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.7", AMOLED',
            'Camera sau': '64MP, 8MP, 2MP',
            'Camera trước': '32MP',
            'CPU': 'Dimensity 7050',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'OPPO Reno11 F với camera selfie 32MP, sạc nhanh 67W và thiết kế đẹp mắt.'
    },
    {
        id: 5,
        name: 'Vivo V30e 5G 8GB',
        brand: 'Vivo',
        price: 9990000,
        oldPrice: 10990000,
        discount: 9,
        image: 'https://cdn.tgdd.vn/Products/Images/42/320466/vivo-v30e-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: false,
        bestSelling: true,
        specs: {
            'Màn hình': '6.78", AMOLED',
            'Camera sau': '50MP, 8MP',
            'Camera trước': '50MP',
            'CPU': 'Snapdragon 6 Gen 1',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5500mAh, 44W'
        },
        description: 'Vivo V30e với camera trước 50MP, pin 5500mAh khủng và màn hình AMOLED sắc nét.'
    },
    {
        id: 6,
        name: 'Realme 12 Pro+ 5G 8GB',
        brand: 'Realme',
        price: 10990000,
        oldPrice: 11990000,
        discount: 8,
        image: 'https://cdn.tgdd.vn/Products/Images/42/318874/realme-12-pro-plus-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.7", AMOLED',
            'Camera sau': '50MP, 64MP, 8MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 7s Gen 2',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'Realme 12 Pro+ với camera zoom tele 3x chất lượng cao và hiệu năng mạnh mẽ.'
    },
    {
        id: 7,
        name: 'iPhone 14 Pro Max 128GB',
        brand: 'Apple',
        price: 24990000,
        oldPrice: 27990000,
        discount: 11,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 5,
        hot: false,
        specs: {
            'Màn hình': '6.7", Super Retina XDR',
            'Camera sau': '48MP, 12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A16 Bionic',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '4323mAh, 20W'
        },
        description: 'iPhone 14 Pro Max với Dynamic Island độc đáo và camera 48MP ấn tượng.'
    },
    {
        id: 8,
        name: 'Samsung Galaxy Z Fold5 5G 256GB',
        brand: 'Samsung',
        price: 32990000,
        oldPrice: 40990000,
        discount: 20,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309831/samsung-galaxy-z-fold5-kem-256gb-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '7.6", Dynamic AMOLED 2X',
            'Camera sau': '50MP, 12MP, 10MP',
            'Camera trước': '10MP & 4MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '4400mAh, 25W'
        },
        description: 'Galaxy Z Fold5 là smartphone màn hình gập cao cấp với hiệu năng mạnh mẽ và đa nhiệm tuyệt vời.'
    },
    {
        id: 9,
        name: 'iPhone 15 Pro 128GB',
        brand: 'Apple',
        price: 25990000,
        oldPrice: 28990000,
        discount: 10,
        image: 'https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-white-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.1", Super Retina XDR',
            'Camera sau': '48MP, 12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A17 Pro',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '3274mAh, 20W'
        },
        description: 'iPhone 15 Pro với khung titan nhẹ, nút Action Button và chip A17 Pro mạnh mẽ cho trải nghiệm đỉnh cao.'
    },
    {
        id: 10,
        name: 'Samsung Galaxy S24 Plus 5G 256GB',
        brand: 'Samsung',
        price: 22990000,
        oldPrice: 25990000,
        discount: 12,
        image: 'https://cdn.tgdd.vn/Products/Images/42/307176/samsung-galaxy-s24-plus-violet-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.7", Dynamic AMOLED 2X',
            'Camera sau': '50MP, 12MP, 10MP',
            'Camera trước': '12MP',
            'CPU': 'Exynos 2400',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '4900mAh, 45W'
        },
        description: 'Galaxy S24 Plus với màn hình lớn 6.7 inch, Galaxy AI và hiệu năng mạnh mẽ từ Exynos 2400.'
    },
    {
        id: 11,
        name: 'Xiaomi 14 5G 256GB',
        brand: 'Xiaomi',
        price: 18990000,
        oldPrice: 21990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316771/xiaomi-14-xanh-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.36", AMOLED',
            'Camera sau': '50MP, 50MP, 50MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 8 Gen 3',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '4610mAh, 90W'
        },
        description: 'Xiaomi 14 với camera Leica 50MP, sạc nhanh 90W và màn hình AMOLED sắc nét.'
    },
    {
        id: 12,
        name: 'OPPO Find N3 5G 512GB',
        brand: 'OPPO',
        price: 35990000,
        oldPrice: 44990000,
        discount: 20,
        image: 'https://cdn.tgdd.vn/Products/Images/42/313348/oppo-find-n3-vang-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 16,
        storage: 512,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '7.82", AMOLED Gập',
            'Camera sau': '48MP, 48MP, 64MP',
            'Camera trước': '32MP & 20MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '16GB',
            'Bộ nhớ trong': '512GB',
            'Pin': '4805mAh, 67W'
        },
        description: 'OPPO Find N3 - flagship màn hình gập cao cấp với camera Hasselblad và hiệu năng khủng.'
    },
    {
        id: 13,
        name: 'Vivo V30 Pro 5G 12GB',
        brand: 'Vivo',
        price: 14990000,
        oldPrice: 16990000,
        discount: 12,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319896/vivo-v30-pro-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 512,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.78", AMOLED',
            'Camera sau': '50MP, 50MP, 50MP',
            'Camera trước': '50MP',
            'CPU': 'Dimensity 8200',
            'RAM': '12GB',
            'Bộ nhớ trong': '512GB',
            'Pin': '5000mAh, 80W'
        },
        description: 'Vivo V30 Pro với bộ 3 camera 50MP, sạc nhanh 80W và thiết kế mỏng nhẹ sang trọng.'
    },
    {
        id: 14,
        name: 'Realme GT 6 5G 12GB',
        brand: 'Realme',
        price: 13990000,
        oldPrice: 15990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/322626/realme-gt-6-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.78", AMOLED 120Hz',
            'Camera sau': '50MP, 50MP, 8MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 8s Gen 3',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5800mAh, 120W'
        },
        description: 'Realme GT 6 với pin khủng 5800mAh, sạc siêu nhanh 120W và hiệu năng gaming đỉnh cao.'
    },
    {
        id: 15,
        name: 'iPhone 14 Plus 128GB',
        brand: 'Apple',
        price: 19990000,
        oldPrice: 22990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-plus-blue-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.7", Super Retina XDR',
            'Camera sau': '12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A15 Bionic',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '4325mAh, 20W'
        },
        description: 'iPhone 14 Plus với màn hình lớn 6.7 inch, pin trâu và camera chất lượng cao.'
    },
    {
        id: 16,
        name: 'Samsung Galaxy A55 5G 128GB',
        brand: 'Samsung',
        price: 9990000,
        oldPrice: 11990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319730/samsung-galaxy-a55-5g-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.6", Super AMOLED',
            'Camera sau': '50MP, 12MP, 5MP',
            'Camera trước': '32MP',
            'CPU': 'Exynos 1480',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 25W'
        },
        description: 'Galaxy A55 với thiết kế kim loại cao cấp, camera 50MP và pin 5000mAh bền bỉ.'
    },
    {
        id: 17,
        name: 'Xiaomi Redmi Note 13 Pro 8GB',
        brand: 'Xiaomi',
        price: 7490000,
        oldPrice: 8990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316771/xiaomi-redmi-note-13-pro-tim-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.67", AMOLED 120Hz',
            'Camera sau': '200MP, 8MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Snapdragon 7s Gen 2',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5100mAh, 67W'
        },
        description: 'Redmi Note 13 Pro với camera 200MP ấn tượng, sạc nhanh 67W và giá cả hợp lý.'
    },
    {
        id: 18,
        name: 'OPPO Reno11 5G 256GB',
        brand: 'OPPO',
        price: 10490000,
        oldPrice: 12990000,
        discount: 19,
        image: 'https://cdn.tgdd.vn/Products/Images/42/318333/oppo-reno11-5g-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 4,
        hot: true,
        specs: {
            'Màn hình': '6.7", AMOLED',
            'Camera sau': '50MP, 32MP, 8MP',
            'Camera trước': '32MP',
            'CPU': 'Dimensity 8200',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'OPPO Reno11 với camera chân dung chuyên nghiệp, hiệu năng mạnh mẽ và thiết kế mỏng nhẹ.'
    },
    {
        id: 19,
        name: 'Vivo Y36 5G 128GB',
        brand: 'Vivo',
        price: 5990000,
        oldPrice: 6990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/313186/vivo-y36-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.64", IPS LCD',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Snapdragon 6 Gen 1',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 44W'
        },
        description: 'Vivo Y36 phân khúc tầm trung với pin 5000mAh, camera 50MP và thiết kế trẻ trung.'
    },
    {
        id: 20,
        name: 'Realme C67 8GB',
        brand: 'Realme',
        price: 4990000,
        oldPrice: 5990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316695/realme-c67-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.72", IPS LCD 90Hz',
            'Camera sau': '108MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Snapdragon 685',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'Realme C67 với camera 108MP, màn hình 90Hz mượt mà và giá rẻ phù hợp sinh viên.'
    },
    {
        id: 21,
        name: 'iPhone 13 128GB',
        brand: 'Apple',
        price: 15990000,
        oldPrice: 18990000,
        discount: 16,
        image: 'https://cdn.tgdd.vn/Products/Images/42/250258/iphone-13-midnight-thumb-600x600.jpg',
        category: 'phone',
        ram: 4,
        storage: 128,
        rating: 5,
        hot: false,
        specs: {
            'Màn hình': '6.1", Super Retina XDR',
            'Camera sau': '12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A15 Bionic',
            'RAM': '4GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '3240mAh, 20W'
        },
        description: 'iPhone 13 vẫn là lựa chọn tốt với hiệu năng ổn định, camera chất lượng và giá hợp lý.'
    },
    {
        id: 22,
        name: 'Samsung Galaxy Z Flip5 5G 256GB',
        brand: 'Samsung',
        price: 18990000,
        oldPrice: 23990000,
        discount: 21,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309835/samsung-galaxy-z-flip5-mint-256gb-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.7", Dynamic AMOLED 2X Gập',
            'Camera sau': '12MP, 12MP',
            'Camera trước': '10MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '3700mAh, 25W'
        },
        description: 'Galaxy Z Flip5 với thiết kế gập độc đáo, màn hình phụ lớn hơn và hiệu năng mạnh mẽ.'
    },
    {
        id: 23,
        name: 'Xiaomi 13T Pro 5G 256GB',
        brand: 'Xiaomi',
        price: 12990000,
        oldPrice: 14990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-13t-pro-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.67", AMOLED 144Hz',
            'Camera sau': '50MP, 50MP, 12MP',
            'Camera trước': '20MP',
            'CPU': 'Dimensity 9200+',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 120W'
        },
        description: 'Xiaomi 13T Pro với sạc siêu nhanh 120W, camera Leica và màn hình 144Hz siêu mượt.'
    },
    {
        id: 24,
        name: 'OPPO A78 5G 128GB',
        brand: 'OPPO',
        price: 6490000,
        oldPrice: 7490000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/301973/oppo-a78-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.56", IPS LCD 90Hz',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Dimensity 700',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'OPPO A78 5G với kết nối thế hệ mới, pin 5000mAh và giá cả phải chăng.'
    },
    {
        id: 25,
        name: 'Vivo Y100 5G 256GB',
        brand: 'Vivo',
        price: 7990000,
        oldPrice: 8990000,
        discount: 11,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316771/vivo-y100-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.67", AMOLED 120Hz',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Snapdragon 685',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 80W'
        },
        description: 'Vivo Y100 với sạc nhanh 80W ấn tượng, màn hình AMOLED 120Hz và thiết kế đẹp mắt.'
    },
    {
        id: 26,
        name: 'Realme 11 Pro 5G 256GB',
        brand: 'Realme',
        price: 8990000,
        oldPrice: 10490000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/307643/realme-11-pro-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 4,
        hot: true,
        specs: {
            'Màn hình': '6.7", AMOLED 120Hz',
            'Camera sau': '100MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Dimensity 7050',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'Realme 11 Pro với camera 100MP, thiết kế da vegan sang trọng và sạc nhanh 67W.'
    },
    {
        id: 27,
        name: 'Samsung Galaxy A35 5G 128GB',
        brand: 'Samsung',
        price: 7990000,
        oldPrice: 9490000,
        discount: 16,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319729/samsung-galaxy-a35-5g-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: true,
        specs: {
            'Màn hình': '6.6", Super AMOLED',
            'Camera sau': '50MP, 8MP, 5MP',
            'Camera trước': '13MP',
            'CPU': 'Exynos 1380',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 25W'
        },
        description: 'Galaxy A35 với màn hình Super AMOLED sống động, pin 5000mAh và camera 50MP chất lượng.'
    },
    {
        id: 28,
        name: 'Xiaomi Redmi 13C 128GB',
        brand: 'Xiaomi',
        price: 3290000,
        oldPrice: 3990000,
        discount: 18,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316965/xiaomi-redmi-13c-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 3,
        hot: false,
        specs: {
            'Màn hình': '6.74", IPS LCD 90Hz',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'MediaTek Helio G85',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 18W'
        },
        description: 'Redmi 13C là lựa chọn giá rẻ với pin 5000mAh, camera 50MP và màn hình lớn 6.74 inch.'
    },
    {
        id: 29,
        name: 'OPPO Find X6 Pro 5G 512GB',
        brand: 'OPPO',
        price: 21990000,
        oldPrice: 26990000,
        discount: 19,
        image: 'https://cdn.tgdd.vn/Products/Images/42/301970/oppo-find-x6-pro-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 16,
        storage: 512,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.82", AMOLED 120Hz',
            'Camera sau': '50MP, 50MP, 50MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '16GB',
            'Bộ nhớ trong': '512GB',
            'Pin': '5000mAh, 100W'
        },
        description: 'OPPO Find X6 Pro flagship đỉnh cao với bộ 3 camera Hasselblad 50MP và sạc nhanh 100W.'
    },
    {
        id: 31,
        name: 'iPhone 15 Plus 128GB',
        brand: 'Apple',
        price: 22990000,
        oldPrice: 25990000,
        discount: 12,
        image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-plus-blue-thumbnew-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 5,
        hot: false,
        specs: {
            'Màn hình': '6.7", Super Retina XDR',
            'Camera sau': '48MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A16 Bionic',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '4383mAh, 20W'
        },
        description: 'iPhone 15 Plus với màn hình lớn 6.7 inch, pin trâu và camera chất lượng cao.'
    },
    {
        id: 32,
        name: 'Samsung Galaxy S23 Ultra 5G 256GB',
        brand: 'Samsung',
        price: 23990000,
        oldPrice: 27990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/samsung-galaxy-s23-ultra-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.8", Dynamic AMOLED 2X',
            'Camera sau': '200MP, 10MP, 10MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 45W'
        },
        description: 'Galaxy S23 Ultra với camera 200MP, S Pen tích hợp và hiệu năng mạnh mẽ.'
    },
    {
        id: 33,
        name: 'Xiaomi 13 5G 256GB',
        brand: 'Xiaomi',
        price: 16990000,
        oldPrice: 19990000,
        discount: 15,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-13-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.36", AMOLED 120Hz',
            'Camera sau': '50MP, 10MP, 12MP',
            'Camera trước': '32MP',
            'CPU': 'Snapdragon 8 Gen 2',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '4500mAh, 67W'
        },
        description: 'Xiaomi 13 với camera Leica, màn hình AMOLED 120Hz và hiệu năng đỉnh cao.'
    },
    {
        id: 34,
        name: 'OPPO Reno10 5G 256GB',
        brand: 'OPPO',
        price: 11990000,
        oldPrice: 13990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/320536/oppo-reno10-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: true,
        specs: {
            'Màn hình': '6.7", AMOLED 120Hz',
            'Camera sau': '64MP, 32MP, 8MP',
            'Camera trước': '32MP',
            'CPU': 'Dimensity 7050',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'OPPO Reno10 với camera 64MP, màn hình AMOLED 120Hz và thiết kế đẹp mắt.'
    },
    {
        id: 35,
        name: 'Vivo X90 Pro+ 5G 512GB',
        brand: 'Vivo',
        price: 29990000,
        oldPrice: 34990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309816/vivo-x90-pro-plus-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 16,
        storage: 512,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.78", AMOLED 120Hz',
            'Camera sau': '50MP, 50MP, 50MP, 48MP',
            'Camera trước': '32MP',
            'CPU': 'Dimensity 9200+',
            'RAM': '16GB',
            'Bộ nhớ trong': '512GB',
            'Pin': '4700mAh, 80W'
        },
        description: 'Vivo X90 Pro+ flagship với camera Zeiss, hiệu năng Dimensity 9200+ và sạc nhanh 80W.'
    },
    {
        id: 36,
        name: 'Realme GT Neo 5 5G 256GB',
        brand: 'Realme',
        price: 12990000,
        oldPrice: 14990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/320722/realme-gt-neo-5-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 12,
        storage: 256,
        rating: 5,
        hot: true,
        specs: {
            'Màn hình': '6.74", AMOLED 144Hz',
            'Camera sau': '50MP, 8MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Dimensity 8200',
            'RAM': '12GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 150W'
        },
        description: 'Realme GT Neo 5 với sạc siêu nhanh 150W, màn hình 144Hz và hiệu năng gaming.'
    },
    {
        id: 37,
        name: 'iPhone 14 128GB',
        brand: 'Apple',
        price: 18990000,
        oldPrice: 21990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.1", Super Retina XDR',
            'Camera sau': '12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A15 Bionic',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '3279mAh, 20W'
        },
        description: 'iPhone 14 với Dynamic Island, camera cải tiến và hiệu năng ổn định.'
    },
    {
        id: 38,
        name: 'Samsung Galaxy A54 5G 128GB',
        brand: 'Samsung',
        price: 8990000,
        oldPrice: 10990000,
        discount: 18,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319730/samsung-galaxy-a54-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: true,
        bestSelling: true,
        specs: {
            'Màn hình': '6.4", Super AMOLED',
            'Camera sau': '50MP, 12MP, 5MP',
            'Camera trước': '32MP',
            'CPU': 'Exynos 1380',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 25W'
        },
        description: 'Galaxy A54 với camera 50MP, màn hình Super AMOLED và pin 5000mAh.'
    },
    {
        id: 39,
        name: 'Xiaomi Redmi Note 12 Pro 4G 256GB',
        brand: 'Xiaomi',
        price: 6990000,
        oldPrice: 8490000,
        discount: 18,
        image: 'https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-redmi-note-12-pro-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 256,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.67", AMOLED 120Hz',
            'Camera sau': '108MP, 8MP, 2MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Snapdragon 732G',
            'RAM': '8GB',
            'Bộ nhớ trong': '256GB',
            'Pin': '5000mAh, 67W'
        },
        description: 'Redmi Note 12 Pro với camera 108MP, màn hình AMOLED 120Hz và giá hợp lý.'
    },
    {
        id: 40,
        name: 'OPPO A58 4G 128GB',
        brand: 'OPPO',
        price: 4990000,
        oldPrice: 5990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/301973/oppo-a58-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.56", IPS LCD 90Hz',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Helio G85',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'OPPO A58 với camera 50MP, màn hình 90Hz và pin 5000mAh cho người dùng phổ thông.'
    },
    {
        id: 41,
        name: 'Vivo Y17s 4G 128GB',
        brand: 'Vivo',
        price: 4490000,
        oldPrice: 5490000,
        discount: 18,
        image: 'https://cdn.tgdd.vn/Products/Images/42/313186/vivo-y17s-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.56", IPS LCD',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Helio G85',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 15W'
        },
        description: 'Vivo Y17s với camera 50MP, pin 5000mAh và thiết kế trẻ trung.'
    },
    {
        id: 42,
        name: 'Realme C55 4G 128GB',
        brand: 'Realme',
        price: 3990000,
        oldPrice: 4990000,
        discount: 20,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316695/realme-c55-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.72", IPS LCD 90Hz',
            'Camera sau': '64MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Helio G88',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'Realme C55 với camera 64MP, màn hình 90Hz và pin 5000mAh giá rẻ.'
    },
    {
        id: 43,
        name: 'iPhone SE (2022) 64GB',
        brand: 'Apple',
        price: 12990000,
        oldPrice: 14990000,
        discount: 13,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-se-2022-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 4,
        storage: 64,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '4.7", Retina HD',
            'Camera sau': '12MP',
            'Camera trước': '7MP',
            'CPU': 'Apple A15 Bionic',
            'RAM': '4GB',
            'Bộ nhớ trong': '64GB',
            'Pin': '2018mAh, Lightning'
        },
        description: 'iPhone SE 2022 với thiết kế cổ điển, chip A15 Bionic và giá cả phải chăng.'
    },
    {
        id: 44,
        name: 'Samsung Galaxy M34 5G 128GB',
        brand: 'Samsung',
        price: 6990000,
        oldPrice: 8490000,
        discount: 18,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319730/samsung-galaxy-m34-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.5", Super AMOLED',
            'Camera sau': '50MP, 8MP, 2MP',
            'Camera trước': '13MP',
            'CPU': 'Exynos 1280',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '6000mAh, 25W'
        },
        description: 'Galaxy M34 với pin 6000mAh, camera 50MP và màn hình Super AMOLED.'
    },
    {
        id: 45,
        name: 'Xiaomi Redmi A2+ 64GB',
        brand: 'Xiaomi',
        price: 2490000,
        oldPrice: 2990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316965/xiaomi-redmi-a2-plus-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 3,
        storage: 64,
        rating: 3,
        hot: false,
        specs: {
            'Màn hình': '6.52", IPS LCD',
            'Camera sau': '8MP, 0.08MP',
            'Camera trước': '5MP',
            'CPU': 'MediaTek Helio G36',
            'RAM': '3GB',
            'Bộ nhớ trong': '64GB',
            'Pin': '5000mAh, 10W'
        },
        description: 'Redmi A2+ smartphone giá rẻ với pin 5000mAh và camera cơ bản.'
    },
    {
        id: 46,
        name: 'OPPO A17 4G 64GB',
        brand: 'OPPO',
        price: 3490000,
        oldPrice: 4290000,
        discount: 19,
        image: 'https://cdn.tgdd.vn/Products/Images/42/301973/oppo-a17-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 4,
        storage: 64,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.56", IPS LCD',
            'Camera sau': '50MP, 0.3MP',
            'Camera trước': '5MP',
            'CPU': 'Helio G35',
            'RAM': '4GB',
            'Bộ nhớ trong': '64GB',
            'Pin': '5000mAh, 10W'
        },
        description: 'OPPO A17 với camera 50MP, pin 5000mAh và thiết kế đơn giản.'
    },
    {
        id: 47,
        name: 'Vivo Y02s 4G 32GB',
        brand: 'Vivo',
        price: 2990000,
        oldPrice: 3490000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/313186/vivo-y02s-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 3,
        storage: 32,
        rating: 3,
        hot: false,
        specs: {
            'Màn hình': '6.51", IPS LCD',
            'Camera sau': '8MP',
            'Camera trước': '5MP',
            'CPU': 'Helio P35',
            'RAM': '3GB',
            'Bộ nhớ trong': '32GB',
            'Pin': '5000mAh, 10W'
        },
        description: 'Vivo Y02s smartphone cơ bản với pin 5000mAh và camera 8MP.'
    },
    {
        id: 48,
        name: 'Realme C30s 4G 32GB',
        brand: 'Realme',
        price: 2490000,
        oldPrice: 2990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316695/realme-c30s-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 2,
        storage: 32,
        rating: 3,
        hot: false,
        specs: {
            'Màn hình': '6.5", IPS LCD',
            'Camera sau': '8MP',
            'Camera trước': '5MP',
            'CPU': 'Unisoc SC9863A',
            'RAM': '2GB',
            'Bộ nhớ trong': '32GB',
            'Pin': '5000mAh, 10W'
        },
        description: 'Realme C30s smartphone giá rẻ với pin 5000mAh và camera cơ bản.'
    },
    {
        id: 49,
        name: 'Samsung Galaxy A14 5G 128GB',
        brand: 'Samsung',
        price: 5990000,
        oldPrice: 6990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/42/319729/samsung-galaxy-a14-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.6", PLS LCD',
            'Camera sau': '50MP, 5MP, 2MP',
            'Camera trước': '13MP',
            'CPU': 'Exynos 1330',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 15W'
        },
        description: 'Galaxy A14 với camera 50MP, pin 5000mAh và kết nối 5G.'
    },
    {
        id: 50,
        name: 'Xiaomi Redmi 12C 4GB',
        brand: 'Xiaomi',
        price: 2990000,
        oldPrice: 3590000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/316965/xiaomi-redmi-12c-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 4,
        storage: 128,
        rating: 3,
        hot: false,
        specs: {
            'Màn hình': '6.71", IPS LCD 60Hz',
            'Camera sau': '50MP, 0.08MP',
            'Camera trước': '5MP',
            'CPU': 'MediaTek Helio G85',
            'RAM': '4GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 10W'
        },
        description: 'Redmi 12C với camera 50MP, pin 5000mAh và giá cả phải chăng.'
    },
    {
        id: 51,
        name: 'OPPO A77s 4G 128GB',
        brand: 'OPPO',
        price: 5490000,
        oldPrice: 6490000,
        discount: 15,
        image: 'https://cdn.tgdd.vn/Products/Images/42/301973/oppo-a77s-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.56", IPS LCD 90Hz',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Helio G35',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'OPPO A77s với camera 50MP, màn hình 90Hz và pin 5000mAh.'
    },
    {
        id: 52,
        name: 'Vivo Y22s 4G 128GB',
        brand: 'Vivo',
        price: 4990000,
        oldPrice: 5990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/313186/vivo-y22s-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.55", IPS LCD',
            'Camera sau': '50MP, 2MP',
            'Camera trước': '8MP',
            'CPU': 'Helio G85',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 18W'
        },
        description: 'Vivo Y22s với camera 50MP, RAM 8GB và pin 5000mAh.'
    },
    {
        id: 53,
        name: 'Realme 9i 4G 128GB',
        brand: 'Realme',
        price: 4990000,
        oldPrice: 5990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/307643/realme-9i-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 6,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.6", IPS LCD 90Hz',
            'Camera sau': '50MP, 2MP, 2MP',
            'Camera trước': '16MP',
            'CPU': 'Helio G99',
            'RAM': '6GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '5000mAh, 33W'
        },
        description: 'Realme 9i với camera 50MP, màn hình 90Hz và pin 5000mAh.'
    },
    {
        id: 54,
        name: 'iPhone 12 64GB',
        brand: 'Apple',
        price: 14990000,
        oldPrice: 17990000,
        discount: 17,
        image: 'https://cdn.tgdd.vn/Products/Images/42/250258/iphone-12-den-thumb-600x600.jpg',
        category: 'phone',
        ram: 4,
        storage: 64,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.1", Super Retina XDR',
            'Camera sau': '12MP, 12MP',
            'Camera trước': '12MP',
            'CPU': 'Apple A14 Bionic',
            'RAM': '4GB',
            'Bộ nhớ trong': '64GB',
            'Pin': '2815mAh, 20W'
        },
        description: 'iPhone 12 vẫn là lựa chọn tốt với thiết kế đẹp, camera chất lượng và hiệu năng ổn định.'
    },
    {
        id: 55,
        name: 'Samsung Galaxy S21 FE 5G 128GB',
        brand: 'Samsung',
        price: 12990000,
        oldPrice: 15990000,
        discount: 19,
        image: 'https://cdn.tgdd.vn/Products/Images/42/289700/samsung-galaxy-s21-fe-xanh-thumb-600x600.jpg',
        category: 'phone',
        ram: 8,
        storage: 128,
        rating: 4,
        hot: false,
        specs: {
            'Màn hình': '6.4", Dynamic AMOLED 2X',
            'Camera sau': '12MP, 12MP, 8MP',
            'Camera trước': '32MP',
            'CPU': 'Exynos 2100',
            'RAM': '8GB',
            'Bộ nhớ trong': '128GB',
            'Pin': '4500mAh, 25W'
        },
        description: 'Galaxy S21 FE với camera 32MP trước, màn hình AMOLED và hiệu năng mạnh mẽ.'
    }
];

// Gán mặc định `stock = 10` cho mọi sản phẩm (theo yêu cầu)
products.forEach(p => p.stock = 10);
// Lưu lại vào localStorage để đồng bộ với giao diện admin
localStorage.setItem('products', JSON.stringify(products));

// ==================== ACCESSORIES DATA ====================
const defaultAccessories = [
    {
        id: 1001,
        name: 'Ốp lưng iPhone 15 Pro Max Silicone',
        brand: 'Apple',
        price: 990000,
        oldPrice: 1290000,
        discount: 23,
        image: 'https://cdn.tgdd.vn/Products/Images/60/313045/op-lung-iphone-15-pro-max-silicone-magsafe-thumb-600x600.jpg',
        category: 'accessory',
        type: 'case',
        compatibleWith: ['iPhone 15 Pro Max', 'iPhone'],
        rating: 5,
        stock: 50,
        description: 'Ốp lưng Silicone chính hãng Apple với MagSafe, bảo vệ tối ưu cho iPhone 15 Pro Max.'
    },
    {
        id: 1002,
        name: 'Cáp sạc Type-C to Lightning 1m',
        brand: 'Apple',
        price: 490000,
        oldPrice: 690000,
        discount: 29,
        image: 'https://cdn.tgdd.vn/Products/Images/58/281698/cap-type-c-lightning-1m-apple-mxly3-thumb-600x600.jpg',
        category: 'accessory',
        type: 'cable',
        compatibleWith: ['iPhone', 'iPad'],
        rating: 5,
        stock: 100,
        description: 'Cáp sạc nhanh Type-C to Lightning chính hãng Apple, hỗ trợ sạc nhanh và truyền dữ liệu.'
    },
    {
        id: 1003,
        name: 'Tai nghe AirPods Pro 2 USB-C',
        brand: 'Apple',
        price: 5990000,
        oldPrice: 6990000,
        discount: 14,
        image: 'https://cdn.tgdd.vn/Products/Images/54/325338/tai-nghe-bluetooth-airpods-pro-2-usb-c-apple-thumb-600x600.jpg',
        category: 'accessory',
        type: 'earphone',
        compatibleWith: ['iPhone', 'iPad', 'Android'],
        rating: 5,
        stock: 30,
        description: 'AirPods Pro 2 với chip H2, chống ồn chủ động và cổng sạc USB-C tiện lợi.'
    },
    {
        id: 1004,
        name: 'Sạc nhanh 25W Samsung',
        brand: 'Samsung',
        price: 390000,
        oldPrice: 490000,
        discount: 20,
        image: 'https://cdn.tgdd.vn/Products/Images/58/226207/sac-25w-type-c-samsung-ep-ta800-thumb-600x600.jpg',
        category: 'accessory',
        type: 'charger',
        compatibleWith: ['Samsung', 'Android'],
        rating: 5,
        stock: 80,
        description: 'Củ sạc nhanh 25W chính hãng Samsung, hỗ trợ sạc nhanh cho các dòng Galaxy.'
    },
    {
        id: 1005,
        name: 'Ốp lưng Samsung S24 Ultra Clear',
        brand: 'Samsung',
        price: 590000,
        oldPrice: 790000,
        discount: 25,
        image: 'https://cdn.tgdd.vn/Products/Images/60/313046/op-lung-samsung-s24-ultra-clear-thumb-600x600.jpg',
        category: 'accessory',
        type: 'case',
        compatibleWith: ['Samsung Galaxy S24 Ultra', 'Samsung'],
        rating: 5,
        stock: 60,
        description: 'Ốp lưng trong suốt chính hãng Samsung, bảo vệ và tôn lên vẻ đẹp của S24 Ultra.'
    },
    {
        id: 1006,
        name: 'Tai nghe Galaxy Buds2 Pro',
        brand: 'Samsung',
        price: 3490000,
        oldPrice: 4990000,
        discount: 30,
        image: 'https://cdn.tgdd.vn/Products/Images/54/289781/tai-nghe-bluetooth-samsung-galaxy-buds2-pro-thumb-600x600.jpg',
        category: 'accessory',
        type: 'earphone',
        compatibleWith: ['Samsung', 'Android', 'iPhone'],
        rating: 5,
        stock: 40,
        description: 'Galaxy Buds2 Pro với chất lượng âm thanh Hi-Fi 24bit và chống ồn thông minh.'
    },
    {
        id: 1007,
        name: 'Miếng dán cường lực full màn',
        brand: 'Universal',
        price: 150000,
        oldPrice: 250000,
        discount: 40,
        image: 'https://cdn.tgdd.vn/Products/Images/60/226208/mieng-dan-cuong-luc-thumb-600x600.jpg',
        category: 'accessory',
        type: 'screen-protector',
        compatibleWith: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme'],
        rating: 4,
        stock: 200,
        description: 'Miếng dán cường lực full màn hình, chống trầy xước và va đập hiệu quả.'
    },
    {
        id: 1008,
        name: 'Pin dự phòng 10000mAh Xiaomi',
        brand: 'Xiaomi',
        price: 390000,
        oldPrice: 590000,
        discount: 34,
        image: 'https://cdn.tgdd.vn/Products/Images/57/226209/pin-du-phong-10000mah-xiaomi-thumb-600x600.jpg',
        category: 'accessory',
        type: 'powerbank',
        compatibleWith: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Android'],
        rating: 5,
        stock: 70,
        description: 'Pin dự phòng 10000mAh Xiaomi, sạc nhanh 2 chiều, thiết kế nhỏ gọn tiện lợi.'
    },
    {
        id: 1009,
        name: 'Giá đỡ điện thoại xoay 360°',
        brand: 'Universal',
        price: 99000,
        oldPrice: 199000,
        discount: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/60/226210/gia-do-dien-thoai-thumb-600x600.jpg',
        category: 'accessory',
        type: 'holder',
        compatibleWith: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Android'],
        rating: 4,
        stock: 150,
        description: 'Giá đỡ điện thoại xoay 360°, gắn taplo ô tô hoặc để bàn làm việc.'
    },
    {
        id: 1010,
        name: 'Cáp sạc Type-C to Type-C 1m',
        brand: 'Universal',
        price: 190000,
        oldPrice: 290000,
        discount: 34,
        image: 'https://cdn.tgdd.vn/Products/Images/58/226211/cap-type-c-to-type-c-thumb-600x600.jpg',
        category: 'accessory',
        type: 'cable',
        compatibleWith: ['Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Android'],
        rating: 4,
        stock: 120,
        description: 'Cáp sạc Type-C to Type-C hỗ trợ sạc nhanh và truyền dữ liệu tốc độ cao.'
    },
    {
        id: 1011,
        name: 'Ốp lưng Xiaomi 14 Ultra chống sốc',
        brand: 'Xiaomi',
        price: 290000,
        oldPrice: 490000,
        discount: 41,
        image: 'https://cdn.tgdd.vn/Products/Images/60/313047/op-lung-xiaomi-14-ultra-thumb-600x600.jpg',
        category: 'accessory',
        type: 'case',
        compatibleWith: ['Xiaomi 14 Ultra', 'Xiaomi'],
        rating: 5,
        stock: 45,
        description: 'Ốp lưng chống sốc 4 góc, bảo vệ tối ưu cho Xiaomi 14 Ultra.'
    },
    {
        id: 1012,
        name: 'Tai nghe có dây Type-C',
        brand: 'Universal',
        price: 149000,
        oldPrice: 249000,
        discount: 40,
        image: 'https://cdn.tgdd.vn/Products/Images/54/226212/tai-nghe-type-c-thumb-600x600.jpg',
        category: 'accessory',
        type: 'earphone',
        compatibleWith: ['Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Android'],
        rating: 4,
        stock: 90,
        description: 'Tai nghe có dây Type-C, âm thanh chất lượng cao, tương thích đa dạng thiết bị.'
    }
];

// Initialize accessories from localStorage or use default
let accessories = JSON.parse(localStorage.getItem('accessories'));
if (!accessories || accessories.length === 0) {
    accessories = defaultAccessories;
    localStorage.setItem('accessories', JSON.stringify(accessories));
}

// Save default products to localStorage if not exists
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}

// ==================== UTILITY FUNCTIONS ====================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
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
// Hàm lấy cart key theo user
function getCartKey() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        return `cart_${user.email}`;
    }
    return 'cart_guest'; // Giỏ hàng cho khách
}

// Lấy giỏ hàng của user hiện tại
function getUserCart() {
    const cartKey = getCartKey();
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// Lưu giỏ hàng của user hiện tại
function saveUserCart(cart) {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

let cart = getUserCart();

function updateCartCount() {
    cart = getUserCart(); // Reload cart for current user
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = cartCount;
    });
}

function addToCart(productId, quantity = 1) {
    // Kiểm tra đăng nhập
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBạn có muốn chuyển đến trang đăng nhập không?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    // Lấy giỏ hàng của user hiện tại
    cart = getUserCart();

    const product = products.find(p => p.id === productId);
    if (!product) return;

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
    updateCartCount();
    
    // Show notification
    showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
}

function removeFromCart(productId) {
    cart = getUserCart();
    cart = cart.filter(item => item.id !== productId);
    saveUserCart(cart);
    updateCartCount();
}

function updateCartItemQuantity(productId, quantity) {
    cart = getUserCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveUserCart(cart);
        updateCartCount();
    }
}

function clearCart() {
    cart = [];
    saveUserCart(cart);
    updateCartCount();
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
        <!-- Logo -->
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

// ==================== RENDER PRODUCT CARD WITHOUT BADGES ====================
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
function loadHotProducts() {
    const hotProductsContainer = document.getElementById('hotProducts');
    if (!hotProductsContainer) return;

    const hotProducts = products.filter(p => p.hot).slice(0, 8);
    hotProductsContainer.innerHTML = hotProducts.map(product => renderProductCardWithoutBadges(product)).join('');
}

// ==================== LOAD DISCOUNT PRODUCTS ====================
function loadDiscountProducts() {
    const discountProductsContainer = document.getElementById('discountProducts');
    if (!discountProductsContainer) return;

    const discountProducts = products.filter(p => p.discount > 0).slice(0, 8);
    discountProductsContainer.innerHTML = discountProducts.map(product => renderProductCardWithoutBadges(product)).join('');
}

// ==================== LOAD BEST SELLING PRODUCTS ====================
function loadBestSellingProducts() {
    const bestSellingProductsContainer = document.getElementById('bestSellingProducts');
    if (!bestSellingProductsContainer) return;

    const bestSellingProducts = products.filter(p => p.bestSelling).slice(0, 8);
    bestSellingProductsContainer.innerHTML = bestSellingProducts.map(product => renderProductCardWithoutBadges(product)).join('');
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== BANNER SWIPER ====================
function initBannerSwiper() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.bannerSwiper')) {
        new Swiper('.bannerSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function initSearch() {
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = form.querySelector('#searchInput');
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `sanpham.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    });
}

// ==================== ACCESSORIES RECOMMENDATIONS ====================
function getRecommendedAccessories(productName, limit = 4) {
    const accessories = JSON.parse(localStorage.getItem('accessories')) || [];
    
    // Lọc phụ kiện tương thích với sản phẩm
    const compatible = accessories.filter(acc => {
        return acc.compatibleWith.some(brand => 
            productName.toLowerCase().includes(brand.toLowerCase())
        );
    });
    
    // Nếu không đủ, thêm phụ kiện universal
    if (compatible.length < limit) {
        const universal = accessories.filter(acc => 
            acc.compatibleWith.includes('iPhone') || 
            acc.compatibleWith.includes('Samsung') ||
            acc.compatibleWith.includes('Android')
        );
        compatible.push(...universal);
    }
    
    // Loại bỏ trùng lặp và giới hạn số lượng
    const unique = [...new Map(compatible.map(item => [item.id, item])).values()];
    return unique.slice(0, limit);
}

function renderAccessoryCard(accessory) {
    const discountBadge = accessory.discount > 0 
        ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">-${accessory.discount}%</span>` 
        : '';
    
    return `
        <div class="col">
            <div class="card product-card h-100 shadow-sm">
                ${discountBadge}
                <img src="${accessory.image}" class="card-img-top p-3" alt="${accessory.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title text-truncate" title="${accessory.name}">${accessory.name}</h6>
                    <div class="mt-auto">
                        <div class="d-flex align-items-center mb-2">
                            <span class="text-danger fw-bold fs-5">${formatPrice(accessory.price)}</span>
                            ${accessory.oldPrice ? `<span class="text-muted text-decoration-line-through ms-2 small">${formatPrice(accessory.oldPrice)}</span>` : ''}
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary btn-sm flex-grow-1" onclick="addAccessoryToCart(${accessory.id})">
                                <i class="fas fa-cart-plus"></i> Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addAccessoryToCart(accessoryId) {
    const accessories = JSON.parse(localStorage.getItem('accessories')) || [];
    const accessory = accessories.find(a => a.id === accessoryId);
    
    if (!accessory) {
        showNotification('Không tìm thấy sản phẩm!', 'error');
        return;
    }
    
    const cartKey = getCartKey();
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    const existingItem = cart.find(item => item.id === accessoryId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: accessory.id,
            name: accessory.name,
            price: accessory.price,
            image: accessory.image,
            quantity: 1,
            category: 'accessory'
        });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
    showNotification('Đã thêm phụ kiện vào giỏ hàng!', 'success');
}

// ==================== INITIALIZE DATA ====================
function initializeDefaultData() {
    // Kiểm tra và khởi tạo dữ liệu mặc định nếu localStorage trống
    const storedProducts = localStorage.getItem('products');
    const storedAccessories = localStorage.getItem('accessories');
    
    // Nếu chưa có hoặc là mảng rỗng, lưu dữ liệu mẫu
    if (!storedProducts || JSON.parse(storedProducts).length === 0) {
        console.log('Initializing default product data...');
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    if (!storedAccessories || JSON.parse(storedAccessories).length === 0) {
        console.log('Initializing default accessories data...');
        accessories = defaultAccessories;
        localStorage.setItem('accessories', JSON.stringify(defaultAccessories));
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultData();
    updateCartCount();
    loadHotProducts();
    loadDiscountProducts();
    loadBestSellingProducts();
    initBackToTop();
    initBannerSwiper();
    initSearch();
    initFlashSale();
});

// ==================== FLASH SALE TIMER ====================
function initFlashSale() {
    // Set flash sale end time: default to 6 hours from now (can be changed)
    const storedEnd = localStorage.getItem('flashSaleEnd');
    let endTime;
    if (storedEnd) {
        endTime = new Date(storedEnd);
    } else {
        endTime = new Date(Date.now() + 6 * 60 * 60 * 1000);
        localStorage.setItem('flashSaleEnd', endTime.toISOString());
    }

    const countdownEl = document.getElementById('flashSaleCountdown');
    const bannerEl = document.getElementById('flashSaleBanner');

    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        if (diff <= 0) {
            if (bannerEl) {
                bannerEl.querySelector('#flashSaleTitle').textContent = 'Flash Sale đã kết thúc';
                if (countdownEl) countdownEl.textContent = '00:00:00';
                bannerEl.classList.add('flash-ended');
            }
            clearInterval(intervalId);
            return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (countdownEl) countdownEl.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
}
