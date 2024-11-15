document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Tai Nghe Bluetooth Sony WF-1000XM4', price: 4990000, image: '../img/tainghe1.jpg' },
        { id: 2, name: 'Tai Nghe AirPods Pro', price: 5290000, image: '../img/tainghe2.jpg' },
        { id: 3, name: 'Cáp Sạc Anker Powerline+ II', price: 299000, image: '../img/capsac1.jpg' },
        { id: 4, name: 'Cáp Sạc Type-C Ugreen', price: 199000, image: '../img/capsac2.jpg' },
        { id: 5, name: 'Ốp Lưng Silicon iPhone 14 Pro', price: 250000, image: '../img/oplung1.jpg' },
        { id: 6, name: 'Ốp Lưng Chống Sốc Samsung Galaxy S23', price: 320000, image: '../img/oplung2.jpg' },
        { id: 7, name: 'Sạc Dự Phòng Xiaomi 10000mAh', price: 399000, image: '../img/sacdp1.jpg' },
        { id: 8, name: 'Sạc Dự Phòng Anker PowerCore 20000mAh', price: 799000, image: '../img/sacdp2.jpg' }
    ];

    const productsContainer = document.querySelector('#featured-products .row');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Cập nhật cách lấy thông tin người dùng từ localStorage
    function getCurrentUser() {
        const userDataString = localStorage.getItem('currentUser');
        if (userDataString) {
            try {
                return JSON.parse(userDataString);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    let currentUser = getCurrentUser();

    function updateCart() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    function addToCart(product) {
        if (!currentUser) {
            showDialog();
            return;
        }

        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({...product, quantity: 1 });
        }
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showDialog() {
        document.getElementById('customDialog').style.display = 'block';
    }

    function closeDialog() {
        document.getElementById('customDialog').style.display = 'none';
    }
    document.querySelector('#customDialog button').addEventListener('click', closeDialog);

    // Cập nhật giao diện người dùng
    function updateUserInterface() {
        const authLinks = document.querySelector('.auth-links');
        const userInfo = document.getElementById('userInfo');

        if (currentUser) {
            // Ẩn liên kết đăng nhập/đăng ký
            authLinks.style.display = 'none';
            // Hiển thị thông tin người dùng
            userInfo.style.display = 'flex';
            userInfo.style.alignItems = 'center';
            userInfo.innerHTML = `
                <div class="user-container" style="display: flex; align-items: center; gap: 10px;">
                    <img src="../img/anhdaidien.jpg" alt="Ảnh đại diện" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
                    <span style="color: #333; font-weight: 500;">${currentUser.name || currentUser.email}</span>
                    <button class="btn btn-outline-danger btn-sm" id="logoutButton">Đăng xuất</button>
                </div>
            `;

            // Thêm sự kiện cho nút đăng xuất
            document.getElementById('logoutButton').addEventListener('click', logout);
        } else {
            // Hiển thị liên kết đăng nhập/đăng ký
            authLinks.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    function logout() {
        // Xóa thông tin người dùng và giỏ hàng khỏi localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cartItems');

        // Reset các biến local
        currentUser = null;
        cartItems = [];

        // Cập nhật giao diện
        updateUserInterface();
        updateCart();

        // Chuyển hướng về trang chủ
        window.location.href = 'homepage.html';
    }

    // Render sản phẩm
    function renderProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'col-md-3 mb-4';
            productElement.innerHTML = `
                <div class="card product-card">
                    <h5 class="card-title product-name">${product.name}</h5>
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <p class="card-text product-price">${product.price.toLocaleString('vi-VN')} đ</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });

        // Thêm sự kiện cho các nút "Thêm vào giỏ"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }

    // Xử lý nút giỏ hàng
    const cartButton = document.getElementById('cartButton');
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!currentUser) {
            showDialog();
            return;
        }
        window.location.href = "shopping cart.html";
    });

    // Khởi tạo trang
    updateUserInterface();
    renderProducts();
    updateCart();

    // Kiểm tra trạng thái đăng nhập khi tải trang
    window.addEventListener('storage', function(e) {
        if (e.key === 'currentUser') {
            currentUser = getCurrentUser();
            updateUserInterface();
        }
    });
});