document.addEventListener("DOMContentLoaded", function () {
  const body = document.getElementById("checkout-body");
  const totalAmountElement = document.getElementById("total");
  const checkoutForm = document.getElementById("checkout-form");

  let total = 0;
  let products = [];

  const buyNow = JSON.parse(localStorage.getItem("buyNow"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Nếu có "buyNow" nhưng giỏ hàng trống thì hiển thị sản phẩm đó
  // ✅ Nếu có sản phẩm trong giỏ hàng thì hiển thị toàn bộ giỏ hàng
  if (cart.length > 0) {
    products = cart;
  } else if (buyNow) {
    products = [buyNow];
  } else {
    body.innerHTML = `<tr><td colspan="5" style="text-align:center;">❌ Không có sản phẩm nào để thanh toán.</td></tr>`;
    return;
  }

  // 🛒 Hiển thị danh sách sản phẩm
  products.forEach((p) => {
    const row = document.createElement("tr");
    const subTotal = p.price * (p.quantity || 1);
    total += subTotal;

    row.innerHTML = `
      <td><img src="${p.img}" alt="${p.name}" width="60"></td>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString("vi-VN")} VND</td>
      <td>${p.quantity || 1}</td>
      <td>${subTotal.toLocaleString("vi-VN")} VND</td>
    `;
    body.appendChild(row);
  });

  totalAmountElement.textContent = total.toLocaleString("vi-VN");

  // 🧾 Xử lý khi đặt hàng
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!fullname || !phone || !address) {
  alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
  return;
}

// ✅ Chỉ cho phép nhập toàn số
if (isNaN(phone)) {
  alert("⚠️ Số điện thoại chỉ được chứa số!");
  return;
}


    alert(`✅ Cảm ơn ${fullname}! Đơn hàng của bạn đã được đặt thành công!`);

    // ✅ Xóa dữ liệu chỉ khi đặt hàng xong
    localStorage.removeItem("buyNow");
    localStorage.removeItem("cart");

    // 🔁 Quay lại trang chủ
    window.location.href = "index.html";
  });
});
