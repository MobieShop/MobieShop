function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const table = document.getElementById("products-table");
  const totalAmountElement = document.getElementById("total-amount");
  const checkoutBtn = document.getElementById("checkout-btn");

  let totalAmount = 0;

  // Hiển thị sản phẩm từ localStorage
  cart.forEach((product, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-index", index);

    row.innerHTML = `
      <td class="product-img"><img src="${product.img}" alt="" width="60"></td>
      <td class="product-name">${product.name}</td>
      <td class="product-price">${product.price.toLocaleString("vi-VN")}</td>
      <td><button class="btn-remove">Xoá</button></td>
    `;

    table.appendChild(row);
    totalAmount += parseFloat(product.price);
  });

  totalAmountElement.textContent = totalAmount.toLocaleString("vi-VN") + " VND";

  // Xoá sản phẩm khi click nút
  table.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-remove")) {
      const row = e.target.closest("tr");
      const index = parseInt(row.getAttribute("data-index"));

      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      let newTotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
      totalAmountElement.textContent = newTotal.toLocaleString("vi-VN") + " VND";
      row.remove();

      // Nếu giỏ hàng trống, ẩn nút thanh toán
      if (cart.length === 0) {
        checkoutBtn.style.display = "none";
      }
    }
  });

  // Ẩn nút thanh toán nếu không có sản phẩm
  if (cart.length === 0) {
    checkoutBtn.style.display = "none";
  }

  // Khi bấm "Thanh toán"
  checkoutBtn.addEventListener("click", function () {
    if (cart.length > 0) {
      window.location.href = "checkout.html"; // Chuyển sang trang thanh toán
    } else {
      alert("🛒 Giỏ hàng của bạn đang trống!");
    }
  });
}

window.addEventListener("DOMContentLoaded", displayCart);
