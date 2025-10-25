document.addEventListener("DOMContentLoaded", () => {
    loadUserInfo();
});

// 🔹 Hiển thị thông tin người dùng đang đăng nhập
function loadUserInfo() {
    const currentUser = sessionStorage.getItem("currentLoginUsername");
    if (!currentUser) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "index.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === currentUser);

    if (!foundUser) {
        alert("Không tìm thấy thông tin người dùng!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("username").innerText = foundUser.username;
    document.getElementById("fullname").innerText = foundUser.fullName;
    document.getElementById("gender").innerText =
        foundUser.gender === "male" ? "Nam" : "Nữ";
    document.getElementById("dob").innerText = foundUser.dob;
    document.getElementById("address").innerText = foundUser.address;
    document.getElementById("email").innerText = foundUser.email;
    document.getElementById("phone").innerText = foundUser.phone;
}

// 🔹 Mở popup sửa thông tin
function onEditButton() {
    document.getElementById("edit-popup").style.display = "flex";

    const currentUser = sessionStorage.getItem("currentLoginUsername");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === currentUser);
    if (!foundUser) return;

    document.getElementById("edit-fullname").value = foundUser.fullName || "";
    document.getElementById("edit-dob").value = foundUser.dob || "";
    document.getElementById("edit-address").value = foundUser.address || "";
    document.getElementById("edit-email").value = foundUser.email || "";
    document.getElementById("edit-phone").value = foundUser.phone || "";

    // 🔹 chọn radio giới tính
    if (foundUser.gender === "male") {
        document.getElementById("gender-male").checked = true;
    } else {
        document.getElementById("gender-female").checked = true;
    }
}

// 🔹 Lưu thay đổi thông tin
function saveChanges() {
    const currentUser = sessionStorage.getItem("currentLoginUsername");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === currentUser);

    if (!foundUser) {
        alert("Không tìm thấy người dùng!");
        return;
    }

    foundUser.fullName = document.getElementById("edit-fullname").value;
    foundUser.gender = document.querySelector('input[name="gender"]:checked').value;
    foundUser.dob = document.getElementById("edit-dob").value;
    foundUser.address = document.getElementById("edit-address").value;
    foundUser.email = document.getElementById("edit-email").value;
    foundUser.phone = document.getElementById("edit-phone").value;

    localStorage.setItem("users", JSON.stringify(users));

    closeEditPopup();
    loadUserInfo();
    alert("Cập nhật thông tin thành công!");
}

// 🔹 Đóng popup
function closeEditPopup() {
    document.getElementById("edit-popup").style.display = "none";
}

// 🔹 Đăng xuất
function onLogoutButton() {
    sessionStorage.removeItem("currentLoginUsername");
    alert("Đã đăng xuất!");
    window.location.href = "index.html";
}
