// checkout.js
document.addEventListener('DOMContentLoaded', function() {
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    const orderSummary = document.getElementById('orderSummary');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutForm = document.getElementById('checkoutForm');

    function displayOrderSummary() {
        orderSummary.innerHTML = '';
        let totalPrice = 0;

        checkoutItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'mb-2';
            itemElement.innerHTML = `
                <strong>${item.name}</strong> x ${item.quantity}
                <span class="float-end">${(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
            `;
            orderSummary.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toLocaleString('vi-VN') + ' đ';
    }

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        alert(`Cảm ơn bạn, ${name}! Đơn hàng của bạn đã được xác nhận.
            Chúng tôi sẽ gửi email xác nhận đến ${email}.
            Đơn hàng sẽ được giao đến ${address}.
            Chúng tôi sẽ liên hệ với bạn qua số điện thoại ${phone} nếu cần.`);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cartItems');
        localStorage.removeItem('checkoutItems');

        // Chuyển hướng về trang chủ
        window.location.href = 'homepage.html';
    });

    displayOrderSummary();
});