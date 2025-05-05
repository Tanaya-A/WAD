// // Simulate AJAX POST (localStorage based)
// function ajaxPost(url, data, callback) {
//     setTimeout(() => {
//       // Simulated backend logic
//       if (url === '/register') {
//         let users = JSON.parse(localStorage.getItem('users') || '[]');
//         users.push(data);
//         localStorage.setItem('users', JSON.stringify(users));
//         callback({ status: 'success' });
//       }
//     }, 500);
//   }
  
//   // Registration handler
//   document.getElementById('registerForm')?.addEventListener('submit', function (e) {
//     e.preventDefault();
    
//     const user = {
//       name: document.getElementById('name').value.trim(),
//       email: document.getElementById('email').value.trim(),
//       mobile: document.getElementById('mobile').value.trim(),
//       dob: document.getElementById('dob').value,
//       city: document.getElementById('city').value.trim(),
//       address: document.getElementById('address').value.trim(),
//       username: document.getElementById('username').value.trim(),
//       password: document.getElementById('password').value.trim()
//     };
  
//     // Basic validations
//     if (!/^\d{10}$/.test(user.mobile)) {
//       alert("Invalid mobile number");
//       return;
//     }
  
//     ajaxPost('/register', user, function (res) {
//       if (res.status === 'success') {
//         alert("Registration Successful");
//         window.location.href = "login.html";
//       }
//     });
//   });
  
//   // Login handler
//   document.getElementById('loginForm')?.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const username = document.getElementById('loginUsername').value.trim();
//     const password = document.getElementById('loginPassword').value.trim();
  
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(u => u.username === username && u.password === password);
  
//     if (user) {
//       alert(`Welcome, ${user.name}`);
//       window.location.href = "users.html";
//     } else {
//       alert("Invalid username or password");
//     }
//   });

  

  // Register form
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      dob: document.getElementById("dob").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// Login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(function(user) {
      return user.username === username && user.password === password;
    });

    if (matchedUser) {
      alert("Login successful!");
      window.location.href = "users.html";
    } else {
      alert("Invalid username or password.");
    }
  });
}
