const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// ...existing code...

// Modal logic
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const toRegister = document.getElementById("to-register");
const closeLogin = document.getElementById("close-login");
const closeRegister = document.getElementById("close-register");

// Show login modal
loginLink.onclick = function() {
  loginModal.style.display = "block";
  registerModal.style.display = "none";
};
// Show register modal
registerLink.onclick = function() {
  registerModal.style.display = "block";
  loginModal.style.display = "none";
};
// From login to register
toRegister.onclick = function() {
  registerModal.style.display = "block";
  loginModal.style.display = "none";
};
// Close modals
closeLogin.onclick = function() { loginModal.style.display = "none"; };
closeRegister.onclick = function() { registerModal.style.display = "none"; };
// Close on outside click
window.onclick = function(event) {
  if (event.target == loginModal) loginModal.style.display = "none";
  if (event.target == registerModal) registerModal.style.display = "none";
};
// ...existing code...

// Helper function to validate name
function isValidName(name) {
  // At least 5 letters, first letter uppercase, only letters and spaces allowed
  return /^[A-Z][a-zA-Z\s]{4,}$/.test(name);
}

// Helper function to validate email
function isValidEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Registration logic
document.getElementById("register-submit").onclick = function() {
  const errorDiv = document.getElementById("register-error");
  errorDiv.textContent = ""; // Clear previous errors

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  if (!name || !email || !password || !confirm) {
    errorDiv.textContent = "Please fill all fields.";
    return;
  }
  if (!isValidName(name)) {
    errorDiv.textContent = "Name must start with a capital letter and be at least 5 letters.";
    return;
  }
  if (!isValidEmail(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    return;
  }
  if (password !== confirm) {
    errorDiv.textContent = "Passwords do not match.";
    return;
  }
  // Save to localStorage
  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  errorDiv.style.color = "green";
  errorDiv.textContent = "Registration successful!";
  setTimeout(() => {
    registerModal.style.display = "none";
    loginModal.style.display = "block";
    errorDiv.style.color = "red";
    errorDiv.textContent = "";
  }, 1000);
};

// Login logic (with error div)
document.getElementById("login-submit").onclick = function() {
  const errorDiv = document.getElementById("login-error");
  errorDiv.textContent = ""; // Clear previous errors

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    errorDiv.style.color = "green";
    errorDiv.textContent = "Login successful!";
    setTimeout(() => {
      loginModal.style.display = "none";
      errorDiv.style.color = "red";
      errorDiv.textContent = "";
    }, 1000);
  } else {
    errorDiv.textContent = "Invalid credentials.";
  }
};

// ...existing code...

// Show/hide logout button based on login status
function updateAccountDropdown() {
  const user = JSON.parse(localStorage.getItem("user"));
  const accountDropdown = document.getElementById("accountDropdown");
  const dropdownMenu = accountDropdown?.nextElementSibling;
  if (!dropdownMenu) return;

  // Remove existing logout if present
  const logoutItem = dropdownMenu.querySelector("#logout-link");
  if (logoutItem) logoutItem.remove();

  if (user && user.isLoggedIn) {
    // Add logout button
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.id = "logout-link";
    a.textContent = "Logout";
    li.appendChild(a);
    dropdownMenu.appendChild(li);

    // Hide login/register
    document.getElementById("login-link").style.display = "none";
    document.getElementById("register-link").style.display = "none";
  } else {
    // Show login/register
    document.getElementById("login-link").style.display = "";
    document.getElementById("register-link").style.display = "";
  }
}

// Call on page load
updateAccountDropdown();

// Listen for logout click
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "logout-link") {
    localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), isLoggedIn: false }));
    updateAccountDropdown();
  }
});

// Update login logic to set isLoggedIn
document.getElementById("login-submit").onclick = function() {
  const errorDiv = document.getElementById("login-error");
  errorDiv.textContent = ""; // Clear previous errors

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    errorDiv.style.color = "green";
    errorDiv.textContent = "Login successful!";
    user.isLoggedIn = true;
    localStorage.setItem("user", JSON.stringify(user));
    updateAccountDropdown();
    setTimeout(() => {
      loginModal.style.display = "none";
      errorDiv.style.color = "red";
      errorDiv.textContent = "";
    }, 1000);
  } else {
    errorDiv.textContent = "Invalid credentials.";
  }
};

// ...existing code...

// ...existing code...