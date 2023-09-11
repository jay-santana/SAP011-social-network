function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}
  
function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}
  
function login() {
    window.location.href = 'home.html';
}
  
function register() {
    window.location.href = 'cadastro.html';
}
  
function isEmailValid() {
    const email = form.email().value; 
    if(!email) {
      return false;
    }
    return validateEmail(email);
}
  
function toggleEmailErrors() {
    const email = form.email().value;
    if(!email) {
      form.emailRequiredError().style.display = "block";
    } else {
      form.emailRequiredError().style.display = "none";
    }
  
    if(validateEmail(email)) {
      form.emailInvalidError().style.display = "none";
    } else {
      form.emailInvalidError().style.display = "block";
    }
}
  
function togglePasswordErrors() {
    const password = form.password().value;
    if(!password) {
      form.passwordRequiredError().style.display = "block";
    } else {
      form.passwordRequiredError().style.display = "none";
    }
}
  
function toggleButtonDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;
  
    const passwordValid = isPasswordValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}
  
function isPasswordValid() {
    const password = form.password().value;
    if(!password) {
      return false;
    }
    return true;
}
  
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPasswordButton: () => document.getElementById('recover-password-button')
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}