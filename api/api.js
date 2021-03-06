
var admin = require("firebase-admin");

var serviceAccount = require("./firestore-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covidp-419b2.firebaseio.com"
});

const db = admin.firestore();

let Firestore = {
    save : async (data) => {

        let docRef = db.collection(process.env.COLLECTION || 'reports').doc();

        let setAda = docRef.set({
        radius : data
        }).catch(console.err)

    }, 
    get : async () => {
        
     return await db.collection(process.env.COLLECTION ||'reports').get();


    },
    getStatus : async () => {
        
        return await db.collection('status').get();
   
   
       }
};

Firestore.get();



module.exports = Firestore;
