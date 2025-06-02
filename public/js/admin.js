// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc , updateDoc, deleteDoc, deleteField, query, where } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";


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
const auth = getAuth(app);

auth.onAuthStateChanged(function(user) {
  if (user) {
      alert("ยินดีต้อนรับ");
  } else {
      window.location.href = "index.html";
  }
});

const collectionRef = collection(db, 'CustomerList');
const amountBefore = query(collectionRef, where("sex","==","male"), where("age", ">=", 0),where("age", "<=", 19));
const amountFirstAge = query(collectionRef, where("sex","==","male"), where("age", ">=", 20),where("age", "<=", 29));
const amountSecondAge = query(collectionRef, where("sex","==","male"), where("age", ">=", 30),where("age", "<=", 39));
const amountThirdAge = query(collectionRef, where("sex","==","male"), where("age", ">=", 40),where("age", "<=", 49));
const amountFourthAge = query(collectionRef, where("sex","==","male"), where("age", ">=", 50),where("age", "<=", 59));
const amountFifthAge = query(collectionRef, where("sex","==","male"), where("age", ">=", 60),where("age", "<=", 100));
const Female_amountBefore = query(collectionRef, where("sex","==","female"), where("age", ">=", 0),where("age", "<=", 19));
const Female_amountFirstAge = query(collectionRef, where("sex","==","female"), where("age", ">=", 20),where("age", "<=", 29));
const Female_amountSecondAge = query(collectionRef, where("sex","==","female"), where("age", ">=", 30),where("age", "<=", 39));
const Female_amountThirdAge = query(collectionRef, where("sex","==","female"), where("age", ">=", 40),where("age", "<=", 49));
const Female_amountFourthAge = query(collectionRef, where("sex","==","female"), where("age", ">=", 50),where("age", "<=", 100));
const amountMale = query(collectionRef, where("sex","==","male"));
const amountFeMale = query(collectionRef, where("sex","==","female"));
const Totalsixkm = query(collectionRef, where("model_apply","==","6km"));
const Totalelevenkm = query(collectionRef, where("model_apply","==","11km"));
const Totalvip = query(collectionRef, where("model_apply","==","vip"));
const TotalDelivery = query(collectionRef, where("delivery","==","yes"));

let downloadcsv = document.getElementById('downloadcsv');



  getDocs(collectionRef)
  .then((querySnapshot) => {
      const totalDocs = querySnapshot.size;
      //console.log(`Total documents: ${totalDocs}`);
      document.getElementById('TotalRegister').innerText = `${totalDocs}`;
  })
  .catch((error) => {
      console.log(`Error getting documents: ${error}`);
  });

  getDocs(amountBefore)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalBefore = querySnapshot.size;
      //console.log(`Total documents: ${totalBefore}`);
      document.getElementById('amountBefore').innerText = `${totalBefore}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });

  getDocs(amountFirstAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFirstAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFirstAge}`);
      document.getElementById('amountFirstAge').innerText = `${totalFirstAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountSecondAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalSecondAge = querySnapshot.size;
      //console.log(`Total documents: ${totalSecondAge}`);
      document.getElementById('amountSecondAge').innerText = `${totalSecondAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountThirdAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalThirdAge = querySnapshot.size;
      //console.log(`Total documents: ${amountThirdAge}`);
      document.getElementById('amountThirdAge').innerText = `${totalThirdAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountFourthAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFourthAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFourthAge}`);
      document.getElementById('amountFourthAge').innerText = `${totalFourthAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountFifthAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFifthAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFifthAge}`);
      document.getElementById('amountFifthAge').innerText = `${totalFifthAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });


  getDocs(Female_amountBefore)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFemale_Before = querySnapshot.size;
      //console.log(`Total documents: ${totalFemale_Before}`);
      document.getElementById('Female_amountBefore').innerText = `${totalFemale_Before}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(Female_amountFirstAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFemale_FirstAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFemale_FirstAge}`);
      document.getElementById('Female_amountFirstAge').innerText = `${totalFemale_FirstAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(Female_amountSecondAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFemale_SecondAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFemale_SecondAge}`);
      document.getElementById('Female_amountSecondAge').innerText = `${totalFemale_SecondAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(Female_amountThirdAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFemale_ThirdAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFemale_ThirdAge}`);
      document.getElementById('Female_amountThirdAge').innerText = `${totalFemale_ThirdAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(Female_amountFourthAge)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFemale_FourthAge = querySnapshot.size;
      //console.log(`Total documents: ${totalFemale_FourthAge}`);
      document.getElementById('Female_amountFourthAge').innerText = `${totalFemale_FourthAge}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });

  
  getDocs(amountMale)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalMale = querySnapshot.size;
      //console.log(`Total documents: ${totalMale}`);
      document.getElementById('amountMale').innerText = `${totalMale}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountFeMale)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFeMale = querySnapshot.size;
      //console.log(`Total documents: ${totalFeMale}`);
      document.getElementById('amountFemale').innerText = `${totalFeMale}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(amountFeMale)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const totalFeMale = querySnapshot.size;
      //console.log(`Total documents: ${totalFeMale}`);
      document.getElementById('amountFemale').innerText = `${totalFeMale}`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  getDocs(TotalDelivery)
  .then((querySnapshot) => {
      // นับจำนวน documents ที่มีใน query
      const Totalexpress = querySnapshot.size;
      //console.log(`Total documents: ${Totalexpress}`);
      document.getElementById('Totalexpress').innerText = `${Totalexpress} ราย`;
      // วนลูปผ่าน documents แต่ละตัวเพื่อแสดงผล
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
      });
    });
  
  // กำหนดตัวแปรราคาของแต่ละประเภท
const priceSix = 400;
const priceEleven = 600;
const priceVIP = 1000;
const priceDelivery = 50;

// ดึงข้อมูลจาก Firestore
getDocs(Totalsixkm)
.then((querySnapshot) => {
  const totalSix = querySnapshot.size; // นับจำนวน documents ที่มีใน query
  const totalPriceSix = totalSix * priceSix; // คำนวณราคารวมของ 6km
  document.getElementById('Totalsixkm').innerText = `${totalPriceSix} บาท`;

  // ดึงข้อมูลจาก Firestore อีกประเภทหนึ่ง
  getDocs(Totalelevenkm)
  .then((querySnapshot) => {
      const totalEleven = querySnapshot.size; // นับจำนวน documents ที่มีใน query
      const totalPriceEleven = totalEleven * priceEleven; // คำนวณราคารวมของ 11km
      document.getElementById('Totalelevenkm').innerText = `${totalPriceEleven} บาท`;

      // ดึงข้อมูลจาก Firestore ประเภทสุดท้าย
      getDocs(Totalvip)
      .then((querySnapshot) => {
          const totalVIP = querySnapshot.size; // นับจำนวน documents ที่มีใน query
          const totalPriceVIP = totalVIP * priceVIP; // คำนวณราคารวมของ VIP
          document.getElementById('Totalvip').innerText = `${totalPriceVIP} บาท`;

          // คำนวณผลรวมของราคาทั้งหมด
          const totalPriceAll = totalPriceSix + totalPriceEleven + totalPriceVIP;
          document.getElementById('Totalincome').innerText = `${totalPriceAll} บาท`;
      });
  });
});
  
getDocs(TotalDelivery)
.then((querySnapshot) => {
  const TotalDelivery = querySnapshot.size; // นับจำนวน documents ที่มีใน query
  const totalPriceDelivery = TotalDelivery * priceDelivery; // คำนวณราคารวมของ 6km
  document.getElementById('Totaldelivery').innerText = `${totalPriceDelivery} บาท`;
});