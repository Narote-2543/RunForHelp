const functions = require('firebase-functions');
const admin = require('firebase-admin');
const xlsx = require('xlsx');
const serviceAccount = require('firebase-to-csv.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://[PROJECT_ID].firebaseio.com'
});

const firestore = admin.firestore();

exports.exportToExcel = functions.https.onRequest(async (req, res) => {
  try {
    const collectionRef = firestore.collection('CustomerList');
    const collectionData = await collectionRef.get();
    const workbook = xlsx.utils.book_new();
    const sheetData = [];

    collectionData.forEach(doc => {
      const data = doc.data();
      sheetData.push(data);
    });

    const worksheet = xlsx.utils.json_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const fileBuffer = await xlsx.write(workbook, { type: 'buffer' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=my_file.xlsx');
    res.send(fileBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error exporting data to Excel');
  }
});
