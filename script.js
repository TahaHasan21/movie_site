import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBLNJQxgSanvtbBPi5E9ELMFQs1TOxGDxE",
authDomain: "movie-website-6d4ec.firebaseapp.com",
projectId: "movie-website-6d4ec",
storageBucket: "movie-website-6d4ec.appspot.com",
messagingSenderId: "10328262937",
appId: "1:10328262937:web:2360d99bb79c6f95d7dd88",
measurementId: "G-2XE25RVXS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup form
document.querySelector('.signup form').addEventListener('submit', async (e) => {
e.preventDefault();
const email = e.target.email.value;
const password = e.target.pswd.value;

try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  alert('User registered successfully');
  e.target.reset(); // Reset the form after successful signup
} catch (error) {
  console.error('Error signing up:', error);
  alert('Failed to register user');
}
});

// Login form
document.querySelector('.login form').addEventListener('submit', async (e) => {
e.preventDefault();
const email = e.target.email.value;
const password = e.target.pswd.value;

try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  alert('Signed in successfully');
  e.target.reset(); // Reset the form after successful login
  window.location.href = 'home.html'; // Redirect to home page
} catch (error) {
  console.error('Error signing in:', error);
  alert('Failed to sign in');
}
});



document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});



