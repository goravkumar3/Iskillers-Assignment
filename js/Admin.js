let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user);
    uid = user.uid;
    if (!user.emailVerified) {
    }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
const showMessage = document.querySelector("#messageBox");
const ShowDiv = document.createElement("div");
messageBox.appendChild(ShowDiv);
firebase
.database()
.ref("messages/")
.on("child_added", (TodoData) => {
  const key = TodoData.key;
  TodoData.forEach((TodoValue) => {
    const value = TodoValue.val();
    const out = document.createElement("h3");
    out.setAttribute("class", "h3");
    out.setAttribute("class", "showMessage");
      ShowDiv.prepend(out);
      out.textContent=value;
    });
  });
let back=()=>{
    history.back();
}