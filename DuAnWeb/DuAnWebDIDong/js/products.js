// Import products and utilities from main.js
// These will be available since main.js is loaded first

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Initialize products after API load
function initializeProducts() {
    allProducts = [...products];
    filteredProducts = [...products];
    applyFilters();
}

// ==================== FILTER PRODUCTS ====================
function filterProducts() {
    applyFilters(); // Use the new applyFilters function
}

// ==================== SORT PRODUCTS ====================
function sortProducts() {
    applyFilters(); // Use the new applyFilters function which includes sorting
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const container = document.getElementById('productsList');
    const countElement = document.getElementById('productCount');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    if (!container) return;

    // Show loading state
    if (loadingState) loadingState.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'none';

    // Simulate loading delay for better UX
    setTimeout(() => {
        // Hide loading state
        if (loadingState) loadingState.style.display = 'none';

        // Update count
        if (countElement) {
            countElement.textContent = `Tìm thấy ${filteredProducts.length} sản phẩm`;
        }

        // Calculate pagination
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        // Render products
        if (productsToShow.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            container.style.display = 'none';
        } else {
            container.innerHTML = productsToShow.map(product => renderProductCard(product)).join('');
            container.style.display = '';
            if (emptyState) emptyState.style.display = 'none';
        }

        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300); // 300ms delay for smooth loading
}

// ==================== RENDER PAGINATION ====================
function renderPagination() {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) {
        paginationElement.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;

    paginationElement.innerHTML = paginationHTML;
}

// ==================== CHANGE PAGE ====================
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
}

// ==================== SEARCH PRODUCTS ====================
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        window.location.href = `sanpham.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// ==================== SINGLE CHECKBOX SELECTION ====================
function handleSingleCheckbox(clickedCheckbox, groupClass) {
    if (clickedCheckbox.checked) {
        // Uncheck all other checkboxes in the same group
        document.querySelectorAll(`.${groupClass}`).forEach(checkbox => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
    applyFilters();
}

// ==================== RESET FILTERS ====================
function resetFilters() {
    // Reset old filter checkboxes
    document.querySelectorAll('.filter-brand, .filter-ram, .filter-storage, .filter-screen, .filter-battery').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset price radio buttons
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.checked = false;
    });

    // Reset other radio buttons
    document.querySelectorAll('input[name="brand"], input[name="ram"], input[name="storage"], input[name="screen"], input[name="battery"]').forEach(radio => {
        radio.checked = false;
    });

    // Reset new filter inputs
    const searchInput = document.getElementById('searchInput');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]');

    if (searchInput) searchInput.value = '';
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';

    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    brandCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';

    // Remove URL parameters
    window.location.href = 'sanpham.html';
}

// ==================== APPLY FILTERS ====================
function applyFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get('search')?.toLowerCase() || '';
    const urlCategory = urlParams.get('category') || '';
    const urlBrand = urlParams.get('brand') || '';

    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    const sortBy = document.getElementById('sortSelect')?.value || 'name';

    // Get selected filters from radio buttons
    const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || '';
    const selectedBrand = document.querySelector('input[name="brand"]:checked')?.value || '';
    const selectedRAM = document.querySelector('input[name="ram"]:checked')?.value || '';
    const selectedStorage = document.querySelector('input[name="storage"]:checked')?.value || '';
    const selectedScreen = document.querySelector('input[name="screen"]:checked')?.value || '';
    const selectedBattery = document.querySelector('input[name="battery"]:checked')?.value || '';

    // Combine search terms
    const searchTerm = searchInput || urlSearchTerm;

    // Filter products
    filteredProducts = products.filter(product => {
        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) &&
            !product.brand.toLowerCase().includes(searchTerm) &&
            !product.category.toLowerCase().includes(searchTerm)) {
            return false;
        }

        // Category filter from URL or checkboxes
        if (urlCategory && product.category !== urlCategory) {
            return false;
        }
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Brand filter
        if (urlBrand && product.brand.toLowerCase() !== urlBrand.toLowerCase()) {
            return false;
        }
        if (selectedBrand && product.brand !== selectedBrand) {
            return false;
        }
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }

        // Price filter from checkbox
        if (selectedPrice) {
            const price = product.price / 1000000;
            const [min, max] = selectedPrice.split('-').map(Number);
            if (price < min || price >= max) {
                return false;
            }
        }
        // Price filter from inputs
        if (minPrice > 0 && product.price < minPrice) {
            return false;
        }
        if (maxPrice < Infinity && product.price > maxPrice) {
            return false;
        }

        // RAM filter
        if (selectedRAM) {
            const ram = parseInt(selectedRAM);
            if (ram === 12) {
                if (product.ram < 12) return false;
            } else {
                if (product.ram !== ram) return false;
            }
        }

        // Storage filter
        if (selectedStorage) {
            const storage = parseInt(selectedStorage);
            if (storage === 512) {
                if (product.storage < 512) return false;
            } else {
                if (product.storage !== storage) return false;
            }
        }

        // Screen size filter
        if (selectedScreen) {
            const screenSize = parseFloat(product.specs['Màn hình']?.match(/[\d.]+/)?.[0] || 0);
            if (selectedScreen === 'small' && screenSize >= 6.5) {
                return false;
            }
            if (selectedScreen === 'large' && screenSize < 6.5) {
                return false;
            }
        }

        // Battery filter
        if (selectedBattery) {
            const batteryCapacity = parseInt(product.specs['Pin']?.match(/\d+/)?.[0] || 0);
            const [minBattery, maxBattery] = selectedBattery.split('-').map(Number);
            if (batteryCapacity < minBattery || batteryCapacity >= maxBattery) {
                return false;
            }
        }

        return true;
    });

    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'rating-desc':
                return b.rating - a.rating;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    currentPage = 1; // Reset to first page
    renderProducts();
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL brand parameter and pre-select
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');

    if (brandParam) {
        // Pre-select in brand radio buttons
        const brandRadio = document.querySelector(`input[name="brand"][value="${brandParam}"]`);
        if (brandRadio) {
            brandRadio.checked = true;
        }
    }

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="price"], input[name="brand"], input[name="ram"], input[name="storage"], input[name="screen"], input[name="battery"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    // Add event listeners for new filter inputs
    const searchInput = document.getElementById('searchInput');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (minPriceInput) {
        minPriceInput.addEventListener('input', applyFilters);
    }

    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', applyFilters);
    }

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Add event listener to sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }

    // Note: initializeProducts() will be called from main-api.js after API loads
});