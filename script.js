// 🚫 חסימת גישה לדפים למשתמשים לא מחוברים
const protectedPages = ["index.html", "about.html"];
const currentPage = window.location.pathname.split("/").pop(); 

if (protectedPages.includes(currentPage)) {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
        window.location.href = "login.html"; // העברה אוטומטית להתחברות
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const userIcon = document.getElementById("user-icon");
    const dropdown = document.getElementById("dropdown");
    const usernameDisplay = document.getElementById("username-display");
    const logoutBtn = document.getElementById("logout-btn");

    // 🌙 מעבר בין מצב כהה לבהיר
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // 👤 פתיחת וסגירת תפריט המשתמש
    if (userIcon) {
        userIcon.addEventListener("click", (e) => {
            e.stopPropagation(); // מונע סגירה מיידית
            dropdown.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    }

    // 🔐 התחברות
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "" || password === "") {
                alert("נא למלא את כל השדות");
                return;
            }

            localStorage.setItem("username", username);
            window.location.href = "index.html"; // חזרה לדף הבית
        });
    }

  // 📝 הרשמה עם קוד מיוחד
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("new-username").value.trim();
        const password = document.getElementById("new-password").value.trim();
        const registerCode = document.getElementById("register-code").value.trim();
        const errorMessage = document.getElementById("error-message");

        if (username === "" || password === "" || registerCode === "") {
            alert("נא למלא את כל השדות");
            return;
        }

        if (registerCode !== "נוניתי" && registerCode !== "מאוזי") {
            errorMessage.style.display = "block"; // הצגת הודעת שגיאה
            return;
        }

        localStorage.setItem("username", username);
        errorMessage.style.display = "none"; // הסתרת הודעת השגיאה אם הצליח
        window.location.href = "index.html"; // חזרה לדף הבית
    });
}


    // 🏠 הצגת שם המשתמש אם מחובר
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        usernameDisplay.textContent = storedUsername;
        userIcon.textContent = storedUsername.charAt(0).toUpperCase(); // הצגת האות הראשונה
        userIcon.style.display = "flex"; // הצגת האייקון אם יש משתמש מחובר
    } else {
        userIcon.style.display = "none"; // הסתרת האייקון אם אין משתמש מחובר
    }

    // 🚪 התנתקות
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("username");
            window.location.href = "index.html"; // חזרה לדף הבית
        });
    }
});
