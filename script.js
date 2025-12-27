
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msgElement = document.getElementById("loginMsg")
  if (!email || !password) {
    msgElement.innerText = "Please fill in all fields";
    msgElement.style.color = "red";
    return;
localStorage  }

    
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    msgElement.innerText = "";
    showPage('home');
  } else {
    msgElement.innerText = "Invalid Email or Password";
    msgElement.style.color = "red";
  }
}


function register() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("registerEmail").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;
  const msgElement = document.getElementById("registerMsg");

  if (!fullName || !email || !phone || !password || !confirmPassword) {
    msgElement.innerText = "Please fill in all fields";
    msgElement.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    msgElement.innerText = "Passwords do not match";
    msgElement.style.color = "red";
    return;
  }

  if (!terms) {
    msgElement.innerText = "Please accept Terms & Conditions";
    msgElement.style.color = "red";
    return;
  }

  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    msgElement.innerText = "Email already registered";
    msgElement.style.color = "red";
    return;
  }

  
  const newUser = { fullName, email, phone, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  msgElement.innerText = "Registration successful! Redirecting to login...";
  msgElement.style.color = "green";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}


function logout() {
  localStorage.removeItem("currentUser");
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}

function showPage(pageId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  const selectedSection = document.getElementById(pageId + '-page');
  if (selectedSection) {
    selectedSection.classList.add('active');
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
  window.scrollTo(0, 0);
}
