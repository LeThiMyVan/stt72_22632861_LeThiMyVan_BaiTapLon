document.addEventListener('DOMContentLoaded', function() {
    // Giỏ hàng
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
    const selectAllCheckbox = document.getElementById('selectAll');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="checkbox" class="form-check-input item-checkbox" data-index="${index}">
                </td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString('vi-VN')} đ</td>
                <td>
                    <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                </td>
                <td>${(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Xóa</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.textContent = totalPrice.toLocaleString('vi-VN') + ' đ';
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Tính tổng các món hàng đã được chọn
    function calculateTotalPrice() {
        let totalPrice = 0;
        const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked'));

        selectedItems.forEach(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-index'));
            const item = cartItems[index];
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toLocaleString('vi-VN') + ' đ';
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    function updateQuantity(index, newQuantity) {
        cartItems[index].quantity = newQuantity;
        updateCart();
    }

    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            updateQuantity(index, newQuantity);
        } else if (e.target.classList.contains('item-checkbox')) {
            calculateTotalPrice();
        }
    });

    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        calculateTotalPrice();
    });

    checkoutButton.addEventListener('click', function() {
        const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked'))
            .map(checkbox => parseInt(checkbox.getAttribute('data-index')));

        if (selectedItems.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
            return;
        }

        const checkoutItems = selectedItems.map(index => cartItems[index]);
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
        window.location.href = 'payment.html';
    });

    updateCart();
});