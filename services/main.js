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

renderWorkForms();

function renderWorkForms() {
    db.collection("workForms").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            var workTitle = doc.data().title;
            var workSubtitle = doc.data().subtitle;
            var createdAt = doc.data().createdAt;
            var workThumbnail = doc.data().thumbnail;

            var card = `
            <div class="card work-display-card mx-3">
                <a href="${workThumbnail}"><img src="${workThumbnail}" class="card-img-top" alt="${workTitle}"></a>
                <div class="card-body">
                    <h4 class="card-title">${workTitle}</h4>
                    <h6 class="card-subtitle">${workSubtitle}</h6>
                    <p class="card-text my-2">Created at ${createdAt}</p>
                </div>
            </div>`;
            $("#workFormList").append(card);
        });
    });
}