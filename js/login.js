firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
  console.log(user);
  if(user.emailVerified) {
  window.location.href = "./pages/home.html";
           
    }
} else {

}
});

const email=document.getElementById('email');
const password=document.getElementById('password');
const message=document.getElementById('message');
let login=()=>{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
      message.style.color='green';
        message.innerHTML="Login successfully";
        setTimeout(() => {
            message.style.display='none';
            if(user.emailVerified) {
              window.location.href = "./pages/home.html";
              }
              else{
                window.location.href ='./verifaction.html';
              }
          },3000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      message.style.color='red';
        message.innerHTML = errorMessage;
      });
}
let google=()=>{
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  window.location.href = "./pages/home.html";
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}