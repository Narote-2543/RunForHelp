// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, doc, getDocs, getDoc, setDoc, collection, addDoc , updateDoc, deleteDoc, deleteField, query, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuB2HOTvVSt4VosphPDPQYWHxfuNM9nrE",
    authDomain: "runforhelpbasesystem.firebaseapp.com",
    databaseURL: "https://runforhelpbasesystem-default-rtdb.firebaseio.com",
    projectId: "runforhelpbasesystem",
    storageBucket: "runforhelpbasesystem.appspot.com",
    messagingSenderId: "527424237088",
    appId: "1:527424237088:web:72e7c10569f0b414f41645",
    measurementId: "G-0W4QBHBY98"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const collectionRef = collection(db, 'CustomerList');
  
  getDocs(collectionRef)
      .then((querySnapshot) => {
          const totalDocs = querySnapshot.size;
          console.log(`Total documents: ${totalDocs}`);
          document.getElementById('TotalRegister').innerText = `${totalDocs}`;
      })
      .catch((error) => {
          console.log(`Error getting documents: ${error}`);
      });


  let firstname = document.getElementById('firstname');
  let lastname = document.getElementById('lastname');
  let id_citizen = document.getElementById('id_citizen');
  let age = document.getElementById('age');
  let phonenumber = document.getElementById('phonenumber');
  let sex = document.getElementById('sex');
  let address = document.getElementById('address');
  let email = document.getElementById('email');
  let blood = document.getElementById('blood');
  let birthday = document.getElementById('birthday');
  let em_phone = document.getElementById('em_phone');
  let model_apply = document.getElementById('model_apply');
  let shirtsize = document.getElementById('shirtsize');
  let slip = document.getElementById('slip');
  let urlslip = document.getElementById('urlslip');
  let submit = document.getElementById('submit');
  let idsearch = document.getElementById('idsearch');
  let checklist = document.getElementById('checklist');
  let updatebtn = document.getElementById('update');
  let deletebtn = document.getElementById('delete');
  let delivery = document.getElementById('delivery');


      //////////////////////// GETTING DATA ////////////////////////////////////

      async function GetDocument(){
          const customerRef = collection(db, "CustomerList");
          const queryRef = query(customerRef, where("id", "==", idsearch.value));
          const docSnap = await getDocs(queryRef);
      
          if (docSnap.docs.length > 0) {
              const data = docSnap.docs[0].data();
              firstname.value = data.firstname;
              lastname.value = data.lastname;
              id_citizen.value = data.id;
              age.value = data.age;
              phonenumber.value = data.phonenumber;
              sex.value = data.sex;
              address.value = data.address;
              email.value = data.email;
              blood.value = data.blood;
              birthday.value = data.birthday;
              em_phone.value = data.em_phone;
              model_apply.value = data.model_apply;
              shirtsize.value = data.shirtsize;
              urlslip.value = data.slip;
              delivery.value = data.delivery;
          } else {
              alert('ไม่พบข้อมูลการสมัคร');
          }
      }

      
      
      //////////////////////// DELETE DATA ////////////////////////////////////

      async function DeleteData() {
          const customerRef = collection(db, "CustomerList");
          const queryRef = query(customerRef, where("id", "==", id_citizen.value));
          const querySnapshot = await getDocs(queryRef);
        
          if (querySnapshot.docs.length > 0) {
            const docToDelete = querySnapshot.docs[0].ref;
            await deleteDoc(docToDelete);
            window.location = window.location;
            alert('ลบข้อมูลเสร็จสิ้น')
          } else {
            alert("ไม่สามารถลบข้อมูลได้ เนื่องจากเกิดข้อผิดพลาด");
          }
          
        }
        

      checklist.addEventListener('click',GetDocument);
      deletebtn.addEventListener('click',DeleteData);