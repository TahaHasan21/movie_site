

const apiKey = 'e87dfff4';

function searchMovie() {
    const query = document.getElementById('searchQuery').value;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById('movieDetails').innerHTML = `<p>No movies found</p>`;
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';
        movieDiv.innerHTML = `
            <h3>${movie.Title}</h3>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Year:</strong> ${movie.Year}</p>
        `;
        movieDiv.addEventListener('click', () => {
            window.location.href = `details.html?id=${movie.imdbID}`;
        });
        movieDetails.appendChild(movieDiv);
    });
}

// function loadMovieDetails(){
//   const searchListMovies = document.getElementById('movie');
//   searchListMovies.forEach(movie => {
//       movie.addEventListener('click', async () => {
//           // console.log(movie.dataset.id);
//           // movieSearchBox.value = "";
//           const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=e87dfff4`);
//           const movieDetails = await result.json();
//           // console.log(movieDetails);
//           displayMovieDetails(movieDetails);
//       });
//   }); 
// }


// function displayMovieDetails(details){
  
//   window.location.href = `details.html`;
//   resultGrid.innerHTML = `
//   <div class = "movie-poster">
//       <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
//   </div>
//   <div class = "movie-info">
//       <h3 class = "movie-title">${details.Title}</h3>
//       <ul class = "movie-misc-info">
//           <li class = "year">Year: ${details.Year}</li>
//           <li class = "rated">Ratings: ${details.Rated}</li>
//           <li class = "released">Released: ${details.Released}</li>
//       </ul>
//       <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
//       <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
//       <p class = "actors"><b>Actors: </b>${details.Actors}</p>
//       <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
//       <p class = "language"><b>Language:</b> ${details.Language}</p>
//       <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
//   </div>
//   `;
// }



function addToList(movieId) {
    let lists = JSON.parse(localStorage.getItem('lists')) || [];
    const listName = prompt('Enter list name');
    if (listName) {
        let list = lists.find(l => l.name === listName);
        if (!list) {
            list = { name: listName, movies: [], isPublic: confirm('Make this list public?') };
            lists.push(list);
        }
        if (!list.movies.includes(movieId)) {
            list.movies.push(movieId);
            localStorage.setItem('lists', JSON.stringify(lists));
            alert('Movie added to list');
            displayUserLists();
        } else {
            alert('Movie already in list');
        }
    }
}

function displayUserLists() {
    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    const userLists = document.getElementById('userLists');
    userLists.innerHTML = '';
    lists.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.className = 'list';
        listDiv.innerHTML = `
            <h3>${list.name}</h3>
            <p>${list.isPublic ? 'Public' : 'Private'}</p>
            <button onclick="viewList('${list.name}')">View List</button>
        `;
        userLists.appendChild(listDiv);
    });
}

function viewList(listName) {
    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    const list = lists.find(l => l.name === listName);
    if (list) {
        const movieDetails = document.getElementById('movieDetails');
        movieDetails.innerHTML = `<h2>${list.name}</h2>`;
        list.movies.forEach(movieId => {
            const url = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
            fetch(url)
                .then(response => response.json())
                .then(movie => {
                    if (movie.Response === "True") {
                        const movieDiv = document.createElement('div');
                        movieDiv.className = 'movie';
                        movieDiv.innerHTML = `
                            <h3>${movie.Title}</h3>
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            <p><strong>Year:</strong> ${movie.Year}</p>
                        `;
                        movieDetails.appendChild(movieDiv);
                    }
                })
                .catch(error => console.error('Error fetching movie:', error));
        });
    }
}

// Automatically display user lists if on the index page
if (window.location.pathname.endsWith('home.html')) {
    displayUserLists();
}



// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyBLNJQxgSanvtbBPi5E9ELMFQs1TOxGDxE",
//     authDomain: "movie-website-6d4ec.firebaseapp.com",
//     projectId: "movie-website-6d4ec",
//     storageBucket: "movie-website-6d4ec.appspot.com",
//     messagingSenderId: "10328262937",
//     appId: "1:10328262937:web:2360d99bb79c6f95d7dd88",
//     measurementId: "G-2XE25RVXS5"
//   };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// const submitButton = document.getElementById("submit");
// const signupButton = document.getElementById("sign-up");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const main = document.getElementById("main");
// const createacct = document.getElementById("create-acct")

// const signupEmailIn = document.getElementById("email-signup");
// const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
// const signupPasswordIn = document.getElementById("password-signup");
// const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
// const createacctbtn = document.getElementById("create-acct-btn");

// const returnBtn = document.getElementById("return-btn");

// var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// createacctbtn.addEventListener("click", function() {
//   var isVerified = true;

//   signupEmail = signupEmailIn.value;
//   confirmSignupEmail = confirmSignupEmailIn.value;
//   if(signupEmail != confirmSignupEmail) {
//       window.alert("Email fields do not match. Try again.")
//       isVerified = false;
//   }

//   signupPassword = signupPasswordIn.value;
//   confirmSignUpPassword = confirmSignUpPasswordIn.value;
//   if(signupPassword != confirmSignUpPassword) {
//       window.alert("Password fields do not match. Try again.")
//       isVerified = false;
//   }
  
//   if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
//     window.alert("Please fill out all required fields.");
//     isVerified = false;
//   }
  
//   if(isVerified) {
//     createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//       .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       // ...
//       window.alert("Success! Account created.");
     
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//       window.alert("Error occurred. Try again.");
//     });
//   }
// });

// submitButton.addEventListener("click", function() {
//   email = emailInput.value;
//   console.log(email);
//   password = passwordInput.value;
//   console.log(password);

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log("Success! Welcome back!");
//       window.alert("Success! Welcome back!");
//       window.location.href = "home.html"
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("Error occurred. Try again.");
//       window.alert("Error occurred. Try again.");
//     });
// });

// signupButton.addEventListener("click", function() {
//     main.style.display = "none";
//     createacct.style.display = "block";
// });

// returnBtn.addEventListener("click", function() {
//     main.style.display = "block";
//     createacct.style.display = "none";
// });

// const apiKey = 'your_omdb_api_key'; // Replace with your OMDB API key

// function login() {
//     const username = document.getElementById('username').value;
//     if (username) {
//         localStorage.setItem('username', username);
//         window.location.href = 'index.html';
//     } else {
//         alert('Please enter a username');
//     }
// }

// Signup form
// document.querySelector('.signup form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.pswd.value;
  
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     alert('User registered successfully');
//     e.target.reset(); // Reset the form after successful signup
//   } catch (error) {
//     console.error('Error signing up:', error);
//     alert('Failed to register user');
//   }
// });

// // Login form
// document.querySelector('.login form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.pswd.value;

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     alert('Signed in successfully');
//     e.target.reset(); // Reset the form after successful login
//     window.location.href = 'home.html'; // Redirect to home page
//   } catch (error) {
//     console.error('Error signing in:', error);
//     alert('Failed to sign in');
//   }
// });

// const apiKey = 'e87dfff4';


// function searchMovie() {
//     const query = document.getElementById('searchQuery').value;
//     const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.Response === "True") {
//                 displayMovies(data.Search);
//             } else {
//                 document.getElementById('movieDetails').innerHTML = `<p>No movies found</p>`;
//             }
//         })
//         .catch(error => console.error('Error fetching movies:', error));
// }

// function displayMovies(movies) {
//     const movieDetails = document.getElementById('movieDetails');
//     movieDetails.innerHTML = '';
//     movies.forEach(movie => {
//         const movieDiv = document.createElement('div');
//         movieDiv.className = 'movie';
//         movieDiv.innerHTML = `
//             <h3>${movie.Title}</h3>
//             <img src="${movie.Poster}" alt="${movie.Title}">
//             <p><strong>Year:</strong> ${movie.Year}</p>
//             <button onclick="addToList('${movie.imdbID}')">Add to List</button>
//         `;
//         movieDetails.appendChild(movieDiv);
//     });
// }

// function addToList(movieId) {
//     let lists = JSON.parse(localStorage.getItem('lists')) || [];
//     const listName = prompt('Enter list name');
//     if (listName) {
//         let list = lists.find(l => l.name === listName);
//         if (!list) {
//             list = { name: listName, movies: [], isPublic: confirm('Make this list public?') };
//             lists.push(list);
//         }
//         if (!list.movies.includes(movieId)) {
//             list.movies.push(movieId);
//             localStorage.setItem('lists', JSON.stringify(lists));
//             alert('Movie added to list');
//             displayUserLists();
//         } else {
//             alert('Movie already in list');
//         }
//     }
// }

// function displayUserLists() {
//     const lists = JSON.parse(localStorage.getItem('lists')) || [];
//     const userLists = document.getElementById('userLists');
//     userLists.innerHTML = '';
//     lists.forEach(list => {
//         const listDiv = document.createElement('div');
//         listDiv.className = 'list';
//         listDiv.innerHTML = `
//             <h3>${list.name}</h3>
//             <p>${list.isPublic ? 'Public' : 'Private'}</p>
//             <button onclick="viewList('${list.name}')">View List</button>
//         `;
//         userLists.appendChild(listDiv);
//     });
// }

// function viewList(listName) {
//     const lists = JSON.parse(localStorage.getItem('lists')) || [];
//     const list = lists.find(l => l.name === listName);
//     if (list) {
//         const movieDetails = document.getElementById('movieDetails');
//         movieDetails.innerHTML = `<h2>${list.name}</h2>`;
//         list.movies.forEach(movieId => {
//             const url = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
//             fetch(url)
//                 .then(response => response.json())
//                 .then(movie => {
//                     if (movie.Response === "True") {
//                         const movieDiv = document.createElement('div');
//                         movieDiv.className = 'movie';
//                         movieDiv.innerHTML = `
//                             <h3>${movie.Title}</h3>
//                             <img src="${movie.Poster}" alt="${movie.Title}">
//                             <p><strong>Year:</strong> ${movie.Year}</p>
//                         `;
//                         movieDetails.appendChild(movieDiv);
//                     }
//                 })
//                 .catch(error => console.error('Error fetching movie:', error));
//         });
//     }
// }

// // Automatically display user lists if on the index page
// if (window.location.pathname.endsWith('index.html')) {
//     displayUserLists();
// }