document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 3, name: 'Cáp Sạc Anker Powerline+ II', price: 299000, image: '../img/capsac1.jpg' },
        { id: 4, name: 'Cáp Sạc Type-C Ugreen', price: 199000, image: '../img/capsac2.jpg' },
        { id: 11, name: 'Cáp Sạc Lightning Baseus', price: 159000, image: '../img/capsac3.jpg' },
        { id: 12, name: 'Cáp Sạc Type-C Aukey Braided', price: 189000, image: '../img/capsac4.jpg' }
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