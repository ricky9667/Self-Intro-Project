// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAFBGXC1A5rv_vm9J3zIlEuZR9x9b3Vbgg",
    authDomain: "ntut-web-work-form.firebaseapp.com",
    projectId: "ntut-web-work-form",
    storageBucket: "ntut-web-work-form.appspot.com",
    messagingSenderId: "781433215031",
    appId: "1:781433215031:web:9ef91f3101eb2b380747b2",
    measurementId: "G-1QZQY9QTKY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


var fakeUploadButton = document.getElementById("hiddenInput");
fakeUploadButton.addEventListener("change", handleFiles, false);

function handleFiles(e) {
    var fileData = e.target.files[0];
    var workThumbnailText = document.getElementById("workThumbnailText");
    console.log("fileName = " + fileData.name);
    
    var formData = new FormData();
    formData.append("image", fileData);

    $.ajax({
        "url": "https://api.imgur.com/3/image",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Client-ID ed02a02be2c183f"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formData,
        success: (response) => {
            // console.log(response);
            var resp = JSON.parse(response);
            var image = JSON.stringify(resp["data"]["link"]);
            image = image.slice(1, -1);
            workThumbnailText.textContent = image;
            alert("Image uploaded successfully");
        },
        error: (response) => {
            console.log(response);
            workThumbnailText.textContent = "File error :(";
            alert("Error");
        }
    });
}

// generate image link from imgur
$("#uploadImage").click((e) => {
    e.preventDefault();
    fakeUploadButton.click();
});

// submit form clicked
$("#submitForm").click((e) => {
    e.preventDefault();

    // get work form data
    var workTitle = document.getElementById("workTitleInput"); // .value
    var workSubtitle = document.getElementById("workSubtitleInput"); // .value
    var workThumbnailText = document.getElementById("workThumbnailText"); // .textContent
    var uid = getRandomUid();

    // add document
    db.collection("workForms").doc(uid).set({
        title: workTitle.value,
        subtitle: workSubtitle.value,
        thumbnail: workThumbnailText.textContent,
        createdAt: getCurrentTime(),
    })
    .then(() => {
        console.log("Document of " + uid + " written!");
        alert("Added work form " + workTitle.value);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    // reset ui
    workTitle.value = "";
    workSubtitle.value = "";
    workThumbnailText.textContent = "Click to select image -> ";
});

// generate a uid for firebase document
function getRandomUid() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

// get a string of time when function called
function getCurrentTime() {
    var now = new Date();
    var date = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
    var time = now.getHours() + ":" + now.getMinutes();
    return date + " " + time;
}