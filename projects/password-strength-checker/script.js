const passwordInput = document.getElementById("password");
const indicator = document.getElementById("strength-indicator");
const strengthText = document.getElementById("strength-text");
const toggle = document.getElementById("toggle");
const suggestionsBox = document.getElementById("suggestions");

const rules = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

toggle.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let score = 0;
  let suggestions = [];

  if (password.length >= 8) {
    score++;
    rules.length.classList.add("valid");
  } else {
    rules.length.classList.remove("valid");
    suggestions.push("Add at least 8 characters");
  }

  if (/[A-Z]/.test(password)) {
    score++;
    rules.uppercase.classList.add("valid");
  } else {
    rules.uppercase.classList.remove("valid");
    suggestions.push("Add an uppercase letter");
  }

  if (/[a-z]/.test(password)) {
    score++;
    rules.lowercase.classList.add("valid");
  } else {
    rules.lowercase.classList.remove("valid");
    suggestions.push("Add a lowercase letter");
  }

  if (/[0-9]/.test(password)) {
    score++;
    rules.number.classList.add("valid");
  } else {
    rules.number.classList.remove("valid");
    suggestions.push("Add a number");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
    rules.special.classList.add("valid");
  } else {
    rules.special.classList.remove("valid");
    suggestions.push("Add a special character");
  }

  if (score <= 2) {
    indicator.style.width = "30%";
    indicator.style.background = "#dc2626";
    strengthText.textContent = "Weak Password";
  } else if (score <= 4) {
    indicator.style.width = "70%";
    indicator.style.background = "#facc15";
    strengthText.textContent = "Medium Password";
  } else {
    indicator.style.width = "100%";
    indicator.style.background = "#16a34a";
    strengthText.textContent = "Strong Password";
  }

  suggestionsBox.innerHTML =
    suggestions.length > 0
      ? "Suggestions:<br>• " + suggestions.join("<br>• ")
      : "Great! Your password is strong 🔐";
});
