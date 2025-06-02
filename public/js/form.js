// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc , updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

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
let delivery = document.getElementById('delivery');
let priceLabel = document.getElementById('price');
let submit = document.getElementById('submit');


// var checkidcitizen = document.getElementById("id_citizen").value;
// function checkid(value) {
//     maxlength = 13;
//     if (checkidcitizen.lenght > maxlength) {
//         alert("กรอกเลขเกิน");
//     }
// }


async function AddDocument_AutoID(){
    // var ref = collection(db,"CustomerList");
     // Check if document already exists in collection
    const customerRef = collection(db, "CustomerList");
    const queryRef = query(customerRef, where("id", "==", id_citizen.value));
    const querySnapshot = await getDocs(queryRef);
    submit.disabled = true; // ปิดปุ่มส่งฟอร์ม
    
    if (!querySnapshot.empty) {
        alert("มีการสมัครโดยใช้รหัสประจำตัวประชาชนนี้อยู่เเล้ว");
        submit.disabled = false; // เปิดปุ่มส่งฟอร์ม
        return;
    }
    if(firstname.value === '' || lastname.value === '' || id_citizen.value === '' || age.value === '' || phonenumber.value === '' || sex.value === '' || address.value === '' || blood.value === '' || birthday.value === '' || em_phone.value === '' || model_apply.value === '' || shirtsize.value === '' || delivery.value === '') {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        submit.disabled = false; // เปิดปุ่มส่งฟอร์ม
        return;
    }
    const storageRef = ref(getStorage(), 'slips/' + Date.now() + '_' + slip.files[0].name);
    await uploadBytes(storageRef, slip.files[0]);
    const downloadUrl = await getDownloadURL(storageRef);
    const docRef = await addDoc(
        customerRef, {
            firstname: firstname.value,
            lastname: lastname.value,
            id: id_citizen.value,
            age: Number(age.value),
            phonenumber: phonenumber.value,
            sex: sex.value,
            address: address.value,
            email: email.value,
            blood: blood.value,
            birthday: birthday.value,
            em_phone: em_phone.value,
            model_apply: model_apply.value,
            shirtsize: shirtsize.value,
            slip: downloadUrl,
            delivery: delivery.value
        }
    )  

    .then(()=>{    
        window.location.href = "chatline.html";
    })
    .catch((error)=>{
        alert(error);  
        submit.disabled = false; // เปิดปุ่มส่งฟอร์ม
    });
}

submit.addEventListener("click",AddDocument_AutoID);

const prices ={
    vip:1000,
    '11km':600,
    '6km':400,
    delivery:50
};

function updatePrice() {
    let totalPrice = 0;
    // เพิ่มราคาของรุ่นสินค้าที่เลือก
    totalPrice += prices[model_apply.value];
    // เพิ่มราคาของการจัดส่ง (ถ้ามี)
    if (delivery.value === "yes") {
      totalPrice += prices.delivery;
    }
    // แสดงผลราคาทั้งหมด
    priceLabel.textContent = totalPrice;
  }

  model_apply.addEventListener("change", updatePrice);
  delivery.addEventListener("change", updatePrice);

  // แสดงราคาเริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
  updatePrice();


let reset = document.getElementById('reset');

reset.addEventListener("click",function reset(){
    window.location.href = "index.html";
});
function hideLoadingPage() {
    // document.getElementById("loading-overlay").style.display = 'none';
    // document.getElementById("loading-indicator").style.display = 'none';
    document.getElementById("onload1").style.display = 'none';
    document.getElementById("onload2").style.display = 'none';
}

setTimeout(hideLoadingPage, 1000);