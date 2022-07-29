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
const FullName = document.getElementById("Fname");
const fatherName = document.getElementById("Father_name");
const number = document.getElementById("number");
const CINc = document.getElementById("cinc");
const picture = document.getElementById("wizardPicturePreview");
const uploadProcess=document.getElementById("uploadProcess");
setTimeout(() => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((query) => {
      let data = query.data();
      // data.id=doc.id;
      FullName.value = data.FullName;
      fatherName.value = data.FatherName;
      number.value = data.Number;
      CINc.value = data.CINC;
      picture.setAttribute("src", data.ProfileImage);
      console.log(data);
    });
}, 3000);
const profile_image = (e) => {
  const file = e.target.files[0];
  console.log(file);
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`images/${file.name}`)
    .put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      alert("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .update({
            ProfileImage: downloadURL,
          })
          .then(() => {
            // window.location.reload();
          });
      });
    }
  );
};
let userImage;
// upadate system
let update = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      FullName: FullName.value,
      FatherName: fatherName.value,
      Number: number.value,
      CINC: CINc.value,
    })
    .then(() => {
      console.log("Updated user info");
    });
};
$(document).ready(function () {
  // Prepare the preview for profile picture
  $("#wizard-picture").change(function () {
    readURL(this);
  });
});
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
    };
    reader.readAsDataURL(input.files[0]);
  }
}
let back=()=>{
    history.back();
}