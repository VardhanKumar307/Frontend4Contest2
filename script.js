const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const profilePage = document.getElementById('profilePage');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

loginBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  authenticateUser(username, password)
    .then(function(response) {
      if (response.authenticated) {
        const user = {
          username: username,
          token: response.token,
          id: response.id
        };
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: user });

        showProfilePage(username);
      } else {
        alert('Authentication failed. Please try again.');
      }
    })
    .catch(function(error) {
      console.error('Authentication error:', error);
      alert('An error occurred during authentication. Please try again later.');
    });
});

logoutBtn.addEventListener('click', function() {
  store.dispatch({ type: 'LOGOUT' });
  showLoginPage();
});

function authenticateUser(username, password) {
  return fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Authentication request failed');
      }
      return response.json();
    });
}

function showProfilePage(username) {
  usernameDisplay.textContent = username;
  loginForm.classList.add('hidden');
  profilePage.classList.remove('hidden');
}

function showLoginPage() {
  loginForm.reset();
  loginForm.classList.remove('hidden');
  profilePage.classList.add('hidden');
}
