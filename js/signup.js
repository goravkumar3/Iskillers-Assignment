$(document).ready(function(){
  // Prepare the preview for profile picture
      $("#wizard-picture").change(function(){
          readURL(this);
      });
  });
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
  
          reader.onload = function (e) {
              $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
          }
          reader.readAsDataURL(input.files[0]);
      }
  }
const FName = document.getElementById("Fname");
const LName = document.getElementById("Lname");
const fatherName = document.getElementById("Father_name");
const number = document.getElementById("number");
const CINC = document.getElementById("cinc");
const email = document.getElementById("email");
const password = document.getElementById("password");
const course_selection = document.getElementById("Courses");
const qualifying = document.getElementById("qualifying");
const gender = document.getElementById("gender");
const message = document.getElementById("message");
let profileview;
const profile_image=(e)=>{
  const file = e.target.files[0];
  console.log(file);
  var uploadTask = firebase.storage().ref().child(`images/${file.name}`).put(file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      message.innerHTML='Upload is ' + progress + '% done';
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      profileview=downloadURL;
      });
    }
    );
  }
let signup = () => {
  if (FName.value.length === 0) {
    message.innerHTML = "Enter your first name";
    FName.focus();
  } else if (LName.value.length === 0) {
    message.innerHTML = "Enter your last name";
    LName.focus();
  } else if (fatherName.value.length === 0) {
    message.innerHTML = "Enter your father name";
    fatherName.focus();
  } else if (number.value.length === 0) {
    message.innerHTML = "Enter your number";
    number.focus();
  } else if (CINC.value.length === 0) {
    message.innerHTML = "Enter your cinc number";
    CINC.focus();
  } else if (email.value.length === 0) {
    message.innerHTML = "Enter your email";
    email.focus();
  } else if (password.value.length === 0) {
    message.innerHTML = "Enter your password";
    LName.focus();
  } else if (course_selection.selectedIndex === 0) {
    message.innerHTML = "Please Select your Course";
    Courses.focus();
    return false;
  } else if (qualifying.selectedIndex === 0) {
    message.innerHTML = "Please Select your qualification ";
    qualifying.focus();
    return false;
  } else if (gender.selectedIndex === 0) {
    message.innerHTML = "Please Select your gender ";
    gender.focus();
    return false;
  } else {
    const userInfo = {
      FullName: FName.value +" "+ LName.value,
      FatherName: fatherName.value,
      Number: number.value,
      CINC: CINC.value,
      Email: email.value,
      Password: password.value,
      Course_Selected: course_selection.value,
      Qualifying: qualifying.value,
      Gender: gender.value,
      ProfileImage:profileview,
    };
      console.log(userInfo);
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.Email, userInfo.Password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.sendEmailVerification();
        message.style.color = "green";
        message.innerHTML = "signed up successfully";
        setTimeout(() => {
          window.location.href = "./verifaction.html";
        }, 3000);
        firebase.firestore().collection("users/").doc(user.uid).set(userInfo);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        message.innerHTML = errorMessage;
        // ..
      });
  }
};