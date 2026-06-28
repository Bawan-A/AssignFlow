
function getUsers() {
  var data = localStorage.getItem("assignflow_users");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function saveUsers(users) {
  localStorage.setItem("assignflow_users", JSON.stringify(users));
}


var registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var fullname = document.getElementById("fullname").value.trim();
    var email = document.getElementById("register-email").value.trim().toLowerCase();
    var level = document.getElementById("study-level").value;
    var password = document.getElementById("register-password").value;
    var accountTypeInput = document.querySelector('input[name="account-type"]:checked');
    var accountType = accountTypeInput ? accountTypeInput.value : "student";

    var msg = document.getElementById("register-message");

    if (fullname === "" || email === "" || password === "") {
      msg.textContent = "Please fill in all the required fields.";
      msg.className = "form-message error";
      return;
    }

    var users = getUsers();

    
    var alreadyExists = users.some(function (user) {
      return user.email === email;
    });

    if (alreadyExists) {
      msg.textContent = "An account with this email already exists.";
      msg.className = "form-message error";
      return;
    }

    var newUser = {
      fullname: fullname,
      email: email,
      level: level,
      accountType: accountType,
      password: password,
    };

    users.push(newUser);
    saveUsers(users);

    msg.textContent = "Account created! You can now log in.";
    msg.className = "form-message success";
    registerForm.reset();
  });
}


var loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("login-email").value.trim().toLowerCase();
    var password = document.getElementById("login-password").value;
    var rememberMe = document.getElementById("remember-me").checked;
    var msg = document.getElementById("login-message");

    var users = getUsers();
    var matchedUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (!matchedUser) {
      msg.textContent = "Incorrect email or password.";
      msg.className = "form-message error";
      return;
    }

    
    var sessionData = JSON.stringify({
      fullname: matchedUser.fullname,
      email: matchedUser.email,
      accountType: matchedUser.accountType,
    });

    if (rememberMe) {
      
      localStorage.setItem("assignflow_session", sessionData);
    } else {
     
      sessionStorage.setItem("assignflow_session", sessionData);
    }

    msg.textContent = "Login successful, redirecting...";
    msg.className = "form-message success";

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 700);
  });
}


