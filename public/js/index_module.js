import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase ,set ,ref , update} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc , updateDoc, deleteDoc, deleteField, query, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
        
        // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyCuB2HOTvVSt4VosphPDPQYWHxfuNM9nrE",
            authDomain: "runforhelpbasesystem.firebaseapp.com",
            databaseURL: "https://runforhelpbasesystem-default-rtdb.firebaseio.com/",
            projectId: "runforhelpbasesystem",
            storageBucket: "runforhelpbasesystem.appspot.com",
            messagingSenderId: "527424237088",
            appId: "1:527424237088:web:72e7c10569f0b414f41645",
            measurementId: "G-0W4QBHBY98"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const database = getDatabase(app);
        const db = getFirestore();
        
         
        let id = document.getElementById('idcitizen');
        let submitcheck = document.getElementById('submitcheck');

        async function check(){
            const customerRef = collection(db, "CustomerList");
            const queryRef = query(customerRef, where("id", "==", id.value));
            const querySnapshot = await getDocs(queryRef);

            if (!querySnapshot.empty) {
              const selectedData = querySnapshot.docs[0].data(); // เรียกข้อมูลที่เลือกมา
              Swal.fire({
                icon: 'success',
                title: 'สมัครเรียบร้อย',
                html: `<div style="text-transform: uppercase;">
                        ข้อมูลผู้สมัคร: คุณ${selectedData.firstname} ${selectedData.lastname}<br><br>
                        รุ่นที่สมัคร: ${selectedData.model_apply} &nbsp; ไซส์เสื้อ: ${selectedData.shirtsize}
                      </div>`,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ไม่พบการสมัคร',
                text: 'ไม่พบการสมัครงานวิ่ง ด้วยรหัสประชาชนนี้',
              });
            }
            
        };

        submitcheck.addEventListener('click',check);

        function rememberMe() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
          
            if (rememberMe) {
              localStorage.setItem('email', email);
              localStorage.setItem('password', password);
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
            }
          }

        function checkRememberMe() {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
          
            if (email && password) {
              document.getElementById('email').value = email;
              document.getElementById('password').value = password;
              document.getElementById('rememberMe').checked = true;
            }
          }

        login.addEventListener('click', function() {

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                var lgDate = new Date();

                update(ref(database, 'users/' + user.uid), {
                    last_login:  lgDate
                })
                    .then(() => {
                        //Data saved successfully!
                        alert('Welcome');
                      })

                      .catch((error) => {
                        //The write failed...
                        alert(error);
                    });
                rememberMe(); 
                window.location.href = "admin.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });

        checkRememberMe();

