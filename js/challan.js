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
  const ShowUploadprocess=document.querySelector("#ShowUploadprocess");
  let ChalanUrl="";
  const challan_image = (e) => {
    const file = e.target.files[0];
    console.log(file);
    var uploadTask = firebase
      .storage()
      .ref()
      .child(`ChallanImage/${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        ShowUploadprocess.innerHTML="Upload is " + progress + "% done";
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          ChalanUrl=downloadURL;
        });
      }
    );
  };
  const wizard_picture=document.getElementById("wizard-picture");
  let upload=()=>{
   if(ChalanUrl===""){
    alert("please upload your challan");
   }
   else{
    firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      ChallanImage: ChalanUrl,
      pending:true,
      reject:false,
      approve:false,
    })
    .then(() => {
        wizard_picture.setAttribute("disabled", true);
      window.location.reload();
    });
   }
  }
let back=()=>{
    history.back();
}