// navbar.js
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarContainer').innerHTML = data;
            document.getElementById('logout').addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    window.location.href = 'index.html';
                }).catch((error) => {
                    console.error('Error signing out:', error);
                });
            });
        });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
