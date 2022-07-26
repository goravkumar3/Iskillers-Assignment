let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       uid = user.uid;

    console.log(user);
    if(!user.emailVerified) {
    window.location.href = "./verifaction.html";
      }
  } else {
    // User is signed out
    window.location.href = "./../index.html";
  }
  });

  let signout=()=>{
  firebase.auth().signOut();
  }
  $(".humburgur").click(function () {
    $(".main_menu").toggleClass("show_menu");
    $(".subnav").toggleClass("level_menu");
  });
  $(".chevron").click(function () {
    $(".submenu").toggleClass("sub_menu");
  });
const profile_image=document.getElementById("profile_image");
setTimeout(() => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((query) => {
      let data = query.data();
      // data.id=doc.id;
      profile_image.setAttribute("src",data.ProfileImage);
      console.log(data);
    });
}, 3000);
  // let showMessage=()=>{
  //  $("#messagebox").toggleClass("messagebox");
  //  $(this).toggleClass("messbtn");
  // }