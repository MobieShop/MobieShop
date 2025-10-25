// Chuyển ảnh lớn khi nhấn vào ảnh nhỏ
document.addEventListener('DOMContentLoaded', function () {
    const mainImg = document.querySelector('.product-gallery .main-img');
    const thumbs = document.querySelectorAll('.product-gallery .thumbs img');
    thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            mainImg.src = thumb.src;
            mainImg.alt = thumb.alt;
        });
    });

    // ----------------- Xử lý giỏ hàng -----------------
    const btnAddCart = document.querySelector('.add-cart');
    const btnBuyNow = document.querySelector('.buy-now');

    // Lấy thông tin sản phẩm từ giao diện
    const productName = document.querySelector('.product-title').innerText.trim();
    const productPrice = document.querySelector('.price').innerText.replace(/[^\d]/g, "");
    const productImg = document.querySelector('.main-img').src;

    // Hàm lấy giỏ hàng
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Hàm lưu giỏ hàng
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Hàm thêm sản phẩm
    function addToCart() {
        const cart = getCart();
        const existing = cart.find(item => item.name === productName);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: parseFloat(productPrice),
                img: productImg,
                quantity: 1
            });
        }

        saveCart(cart);
        alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    }

    // Sự kiện thêm vào giỏ
    if (btnAddCart) btnAddCart.addEventListener('click', addToCart);

    // Sự kiện mua ngay
    if (btnBuyNow) {
  btnBuyNow.addEventListener("click", () => {
    addToCart(); // thêm vào giỏ hàng
    window.location.href = "checkout.html"; // chuyển sang checkout
  });
}



}); // 👈 Thêm dòng này để đóng event DOMContentLoaded
