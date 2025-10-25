// ===============================
// 🔹 Khi trang tải xong: kiểm tra xem có người dùng đang đăng nhập không
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    let currentUser = sessionStorage.getItem("currentLoginUsername");

    if (currentUser) {
        document.getElementById("login-icon").src = "image/login.png";
        const nameDisplay = document.getElementById("username-display");
        if (nameDisplay) {
            nameDisplay.textContent = "Chào, " + currentUser;
            nameDisplay.classList.add("show");
        }
    } else {
        const nameDisplay = document.getElementById("username-display");
        if (nameDisplay) nameDisplay.textContent = "";
    }
});

// ===============================
// 🔹 Mở popup hoặc chuyển sang trang account nếu đã đăng nhập
// ===============================
function onUserButton() {
    let currentUser = sessionStorage.getItem("currentLoginUsername");

    if (currentUser) {
        window.location.href = "account.html";
    } else {
        document.getElementById('login-popup').style.display = 'flex';
    }
}

// ===============================
// 🔹 Đóng popup đăng nhập
// ===============================
function closeLoginPopup() {
    document.getElementById('login-popup').style.display = 'none';
}

// ===============================
// 🔹 Hàm mở popup đăng ký
// ===============================
function openRegisterPopup() {
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup) loginPopup.style.display = "none";

    let registerPopup = document.getElementById("register-popup");
    if (registerPopup) registerPopup.style.display = "flex";
}

// ===============================
// 🔹 Hàm đóng popup đăng ký
// ===============================
function closeRegisterPopup() {
    let registerPopup = document.getElementById("register-popup");
    if (registerPopup) registerPopup.style.display = "none";
}

// ===============================
// 🔹 Quay lại popup đăng nhập
// ===============================
function goBackToLoginPage() {
    document.getElementById("register-popup").style.display = "none";
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup) loginPopup.style.display = "flex";
}

// ===============================
// 🔹 Kiểm tra form có đầy đủ chưa
// ===============================
function isFormComplete(fields) {
    for (const [key, value] of Object.entries(fields)) {
        if (value.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }
    }
    return true;
}

// ===============================
// 🔹 Xử lý đăng ký (đầy đủ thông tin)
// ===============================
function confirmRegister() {
    let inputUsername = document.getElementById("username").value.trim();
    let inputPassword = document.getElementById("password").value.trim();
    let inputPasswordConfirm = document.getElementById("password-confirm").value.trim();
    let inputFullName = document.getElementById("fullname").value.trim();

    let genderRadios = document.getElementsByName("gender");
    let inputGender = "";
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            inputGender = genderRadios[i].value;
            break;
        }
    }

    let inputDob = document.getElementById("dob").value;
    let citySelect = document.getElementById("city");
    let inputAddress = citySelect.options[citySelect.selectedIndex].text;
    let inputEmail = document.getElementById("email").value.trim();
    let inputPhone = document.getElementById("phone").value.trim();

    // ✅ Kiểm tra đủ thông tin
    if (!isFormComplete({
        inputUsername,
        inputPassword,
        inputPasswordConfirm,
        inputFullName,
        inputGender,
        inputDob,
        inputAddress,
        inputEmail,
        inputPhone
    })) return;

    // ✅ Kiểm tra xác nhận mật khẩu
    if (inputPassword !== inputPasswordConfirm) {
        alert("Xác nhận mật khẩu không trùng khớp.");
        return;
    }

    // ✅ Lấy danh sách người dùng
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Kiểm tra trùng tên
    if (users.some(u => u.username === inputUsername)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    // ✅ Thêm người dùng mới
    users.push({
        username: inputUsername,
        password: inputPassword,
        fullName: inputFullName,
        gender: inputGender,
        dob: inputDob,
        address: inputAddress,
        email: inputEmail,
        phone: inputPhone
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    closeRegisterPopup();
    document.getElementById("login-popup").style.display = "flex";
}

// ===============================
// 🔹 Xử lý đăng nhập
// ===============================
function onLoginHandler() {
    let inputUsername = document.getElementById("username-login").value.trim();
    let inputPassword = document.getElementById("password-login").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(
        (u) => u.username === inputUsername && u.password === inputPassword
    );

    if (foundUser) {
        alert("Đăng nhập thành công!");
        sessionStorage.setItem("currentLoginUsername", inputUsername);
        closeLoginPopup();
        document.getElementById("login-icon").src = "image/login.png";
        const nameDisplay = document.getElementById("username-display");
        if (nameDisplay) {
            nameDisplay.textContent = "Chào, " + inputUsername;
            nameDisplay.classList.add("show");
        }
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
}

// ===============================
// 🔹 Đăng xuất
// ===============================
function onLogoutButton() {
    sessionStorage.removeItem("currentLoginUsername");
    document.getElementById("login-icon").src = "image/user.png";
    const nameDisplay = document.getElementById("username-display");
    if (nameDisplay) nameDisplay.textContent = "";
    alert("Đã đăng xuất thành công!");
}
