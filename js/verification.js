const email=document.getElementById('getEmail');
const message=document.getElementById('message');
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
    //   email.innerHTML = user.email;
    email.innerHTML=user.email;
    console.log(user);
    if(user.emailVerified) {
      window.location.href = "./home.html";
      }
  } else {
    // User is signed out
    window.location.href = "./../index.html";
  }
  });
let send = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        message.innerHTML=' Verification sent';
      });
  };