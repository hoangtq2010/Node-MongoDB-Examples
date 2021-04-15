const MongoClient = require('mongodb').MongoClient  //MongoClient cho phep connect Server MongoDb
const assert = require('assert');                   //"check value"
const dboper = require('./operations');


//khoi dong ket noi den Server MongoDB , create 1 bien ten url noi Server MongoDb co the truy cap
const url = 'mongodb://localhost:27017/'        //so port : ma tai do Server MongoDb dang chay
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {         //ket noi voi MongoClient tu server MongoDb
    assert.equal(err, null);
    console.log('Connected correctly to server');

    
    const db = client.db(dbname);                   //db cung cap cac pp khac nhau cho phep tuong tac vs server
    /** 
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
        assert.equal(err, null);
        
        console.log('After Insert:\n');
        console.log(result.ops)         //thuoc tinh ops cho biet bao nhieu kq dc thuc hien thanh cong

        collection.find({}).toArray((err, docs)=>{   //tim kiem tat ca ban ghi trong bo suu tap,chuyen thanh 1 mang JSON
            assert.equal(err, null);

            console.log('Found: \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {      //dropCollection: tha bosuutap dc chi dinh o day
                assert.equal(err, null);

                client.close();
            })
        });   
    });
    */

    dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, 'dishes', (result) => {

        console.log("Insert document:\n", result.ops); //ops : cho biet so luong thao tac insert dc thuc hien

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found documents:\n' , docs);

            dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, 'dishes', (result)=>{

                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Updated Documents:\n' , docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped collection: ' , result);

                        client.close();
                    });
                });
            });
        });
    });
});        