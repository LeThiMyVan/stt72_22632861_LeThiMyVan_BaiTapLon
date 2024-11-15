document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Tai Nghe Bluetooth Sony WF-1000XM4', price: 4990000, image: '../img/tainghe1.jpg' },
        { id: 2, name: 'Tai Nghe AirPods Pro', price: 5290000, image: '../img/tainghe2.jpg' },
        { id: 9, name: 'Tai Nghe Bluetooth JBL Live 300', price: 2290000, image: '../img/tainghe3.jpg' },
        { id: 10, name: 'Tai Nghe Gaming Logitech G435', price: 1490000, image: '../img/tainghe4.jpg' },
        { id: 17, name: 'Tai Nghe Bluetooth Bose QuietComfort Earbuds II', price: 6900000, image: '../img/tainghe5.jpg' },
        { id: 18, name: 'Tai Nghe Sony WH-1000XM5', price: 7990000, image: '../img/tainghe6.jpg' },
        { id: 19, name: 'Tai nghe Lightning MFI Ugreen', price: 299000, image: '../img/tainghe9.jpg' },
        { id: 20, name: 'Tai nghe Baseus 1.5m', price: 259000, image: '../img/tainghe10.jpg' },
        { id: 25, name: 'Tai Nghe True Wireless Samsung Galaxy Buds Pro', price: 3990000, image: '../img/tainghe7.jpg' },
        { id: 26, name: 'Tai Nghe In-Ear Sennheiser Momentum 2', price: 6490000, image: '../img/tainghe8.jpg' },
    ];

    const productsContainer = document.getElementById('productContainer');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];


    const navbarCollapse = document.querySelector('.collapse.navbar-collapse');
    if (!document.querySelector('.auth-links')) {
        const authLinks = document.createElement('div');
        authLinks.className = 'auth-links';
        authLinks.innerHTML = `
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</a>
        `;
        navbarCollapse.insertBefore(authLinks, document.querySelector('.navbar-nav.ms-2'));
    }

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

    // Xử lý hiển thị giỏ hàng
    const cartButton = document.getElementById('cartButton');
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (!currentUser) {
            showDialog();
            return;
        }
        window.location.href = "shopping cart.html";
    });
    // Khởi tạo giao diện người dùng và render sản phẩm
    updateUserInterface();
    renderProducts();
    updateCart();
});