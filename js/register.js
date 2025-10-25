// 🔹 Hàm mở popup đăng ký
function openRegisterPopup() {
    // Ẩn popup đăng nhập (nếu đang mở)
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup) loginPopup.style.display = "none";

    // Hiện popup đăng ký
    let registerPopup = document.getElementById("register-popup");
    if (registerPopup) registerPopup.style.display = "flex";
}

// 🔹 Hàm đóng popup đăng ký (nếu bấm nút X)
function closeRegisterPopup() {
    let registerPopup = document.getElementById("register-popup");
    if (registerPopup) registerPopup.style.display = "none";
}

// 🔹 Hàm quay lại popup login (đóng popup thay vì chuyển trang)
function goBackToLoginPage() {
    // Ẩn popup đăng ký
    document.getElementById("register-popup").style.display = "none";
    // Hiển thị lại popup đăng nhập nếu có
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup) loginPopup.style.display = "flex";
}

// 🔹 Hàm kiểm tra form đã điền đủ chưa
function isFormComplete(fields) {
    for (const [key, value] of Object.entries(fields)) {
        if (value.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }
    }
    return true;
}

// 🔹 Hàm xử lý đăng ký
function confirmRegister() {
    let inputUsername = document.getElementById("username").value.trim();
    let inputPassword = document.getElementById("password").value.trim();
    let inputPasswordConfirm = document.getElementById("password-confirm").value.trim();
    let inputFullName = document.getElementById("fullname").value.trim();

    // Các trường khác...
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

    // Kiểm tra nhập đủ
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

    if (inputPassword !== inputPasswordConfirm) {
        alert("Xác nhận mật khẩu không trùng khớp.");
        return;
    }

    // ✅ Lấy danh sách người dùng cũ
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Kiểm tra trùng username
    if (users.some(u => u.username === inputUsername)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    // ✅ Thêm người dùng mới (có thêm thông tin phụ)
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
    document.getElementById("register-popup").style.display = "none";
    document.getElementById("login-popup").style.display = "flex";
}
