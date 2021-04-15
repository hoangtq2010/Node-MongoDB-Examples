//Thuc hien insert/delete/update/find document in databases
const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {  //dong goi phuong phap chen document tai day
    //chuc nang dc export boi module node tai day
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {    // chen vao collection, dc ho tro boi MongoDb driver
        assert.equal(err, null);    
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
 //result tra ve va se co tren do co 1 thuoc tinh la result property, n: bao nhieu document da dc insert
        callback(result);
        //khi thuc hien "insertDocument" trong index.js se cung cap callback nhan result lam tham so den
    });
};

exports.findDocuments = (db, collection, callback) => {  
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {  
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document " ,document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {  
    const coll = db.collection(collection); 
    coll.updateOne(document, { $set: update}, null,  (err, result) => { //"{ $set:update}" vi tri update
        assert.equal(err, null);
        console.log("Updated the document " ,update );
        callback(result);
    });
};