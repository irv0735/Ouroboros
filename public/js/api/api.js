const API = {
    login: function (email, password) {
        return fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        
    }, 

    logout: function () {
        return fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
        
    }
}
