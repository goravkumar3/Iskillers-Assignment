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
const courseInfo = document.querySelector("#courseInfo");
const challan_upload = document.querySelector("#challanUpload");
const waiting = document.querySelector("#wait");
courseInfo.style.display = "block";
challan_upload.style.display = "none";
waiting.style.display = "none";
setTimeout(() => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((query) => {
      let data = query.data();
      const CourseName = document.createElement("h1");
      CourseName.textContent = data.Course_Selected;
      courseInfo.appendChild(CourseName);
      const coursePara = document.createElement("p");
      coursePara.textContent =
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime neque architecto consectetur voluptatem? Unde sapiente magnam voluptatum quisquam excepturi asperiores ratione, assumenda, maxime, eligendi laboriosam provident molestias voluptatibus at perferendis.";
        courseInfo.appendChild(coursePara);
        const startBtn=document.createElement("button");
        startBtn.textContent="Get Started";
        startBtn.setAttribute("class", "startBtn");
        courseInfo.appendChild(startBtn);
      });
}, 2000);
let course = () => {
  courseInfo.style.display = "block";
  challan_upload.style.display = "none";
  waiting.style.display = "none";
};
let Upload = () => {
  courseInfo.style.display = "none";
  challan_upload.style.display = "flex";
  waiting.style.display = "none";
};
let wait = () => {
  courseInfo.style.display = "none";
  challan_upload.style.display = "none";
  waiting.style.display = "block";
};
const ShowUploadprocess = document.querySelector("#ShowUploadprocess");
let ChalanUrl = "";
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
      ShowUploadprocess.innerHTML = "Upload is " + progress + "% done";
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        ChalanUrl = downloadURL;
      });
    }
  );
};
const wizard_picture = document.getElementById("wizard-picture");
let upload = () => {
  if (ChalanUrl === "") {
    alert("please upload your challan");
  } else {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        ChallanImage: ChalanUrl,
        pending: true,
        reject: false,
        approve: false,
      })
      .then(() => {
        wizard_picture.setAttribute("disabled", true);
        window.location.reload();
      });
  }
};
let back = () => {
  history.back();
};
