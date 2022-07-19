const email=document.getElementById('email');
const message=document.getElementById('message');
let reset=()=>{
    firebase.auth().sendPasswordResetEmail(email.value)
    .then(() => {
      // Password reset email sent!
      // ..
      message.style.color = 'green';
      message.innerHTML='Password reset email sent successfully';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      message.style.color = 'red';
      message.innerHTML = errorMessage;
      // ..
    });
}