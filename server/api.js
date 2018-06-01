const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'demo_mean_crud';



const findAllBooks = function (db, callback) {
    const collection = db.collection('books');

    collection.find({}).toArray((err, books) => {
        assert.equal(null, err);
        console.log('Found the following reccords');
        console.log(books);
        callback(books);
    });
}

/**
 * 
 * Function read all books
 * @author  sarawutt.b@gmail.com
 */
router.get('/readAll', function (req, res) {
    //res.end('Hi, Show API');
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log('Connected successfully to th server');

        const db = client.db(dbName);
        findAllBooks(db, function (result) {
            const response = { response:'OK', result: result };
            res.json(response);
            client.close();
        });

    });

    // mongoClient.connect(mongoConnectionString, function (req, db) {
    //     // db.collection('books')
    //     // .find()
    //     // .toArray()
    //     // .then(books => {
    //     //     const response = {result:'OK',result:response};
    //     //     res.json(response);
    //     // });

    //     // db.close();

    //     db.collection('books')
    //         .find()
    //         .toArray()
    //         .then(books => {
    //             const response = { response:'OK', result: books };
    //             res.json(response);
    //         });

    //     db.close();
    // });
});

/**
 * 
 * Function find book with mated conitions
 * @param {MongoClient instance} db 
 * @param {string} name 
 * @param {function} callback 
 */
const findBooksConditions = (db, name, callback) => {
    const collection = db.collection('books');
    collection.find({ 'name': name })
        .toArray((err, books) => {
            assert.equal(null, err);
            console.log('Founded the following records');
            console.log(books);
            callback(books);
        });

}

/**
 * 
 * Function read a book match with name params conditions
 * @author  sarawutt.b@gmail.com
 */
router.get('/read/:name', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to the Mongo server');
        const db = client.db(dbName);

        //Call for findBooksConditions with params name
        findBooksConditions(db, req.params.name, (result) => {
            const response = { response:'OK', result: result };
            res.json(response);
        });

        client.close();
    });
});


/**
 * 
 * Function insert one of the books
 * @author  sarawutt.b@gmail.com
 */
router.post('/insertOne', function (req, res) {
    //res.end("Hi, " + req.body.name);
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const data = { name: req.body.name };
        console.log(data.name);
        db.collection('books')
            .insertOne(data, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log("Inserted 1 documents into the collection");
                if (err) throw err;
                const response = { response:'OK', result: result.result.n + " Inserted" };
                res.json(response);
            })
        client.close();
    });

    // mongoClient.connect(mongoConnectionString, function (err, db) {
    //     const data = { name: req.body.name };
    //     db.collection('courses').insertOne(data, (err, result) => {
    //         //if (err) throw err;
    //         const response = { response:'OK', message: result.result.n + " Inserted" };
    //         res.json(response);
    //     });
    //     db.close();
    // });
});

/**
 * 
 * Function insert many or insert bulk of post data
 * @author  sarawutt.b@gmail.com
 */
router.post('/insertMany', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        const db = client.db(dbName);

        var data = [{ name: 'PHP OOP' }, { name: 'Reactive Programming' }, { name: 'C# Programming' }, { name: 'C Programming' }];
        db.collection('books')
            .insertMany(data, (err, result) => {
                assert.equal(null, err);
                assert.equal(4, result.result.n);
                assert.equal(4, result.ops.length);
                if (err) throw err;
                const response = { response:'OK', result: result.result.n + " Inserted" };
                res.json(response);
            });
        client.close();
    })
});



/**
 * Update one the match book
 */
const updateBook = (db, name, data, callback) => {
    const collection = db.collection('books');
    collection.updateOne({ name: name }, { $set: data }, (err, book) => {
        assert.equal(null, err);
        assert.equal(1, book.result.n);
        console.log("Update the book where book name = " + name);
        callback(book);
    });
}

router.put('/updateOne/:name', (req, res) => {

    //Connec to the mong server
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to Mongo server');
        const db = client.db(dbName);

        //Call to updateBook function
        updateBook(db, req.params.name, { name: req.body.name }, (result) => {
            const response = { response:'OK', result: result.result.n + " Updated." };
            res.json(response);
        });

        client.close();
    });
});

/**
 * 
 * Function delete one matching the book name sending with params
 * @author  sarawutt.b@gmail.com
 */
router.delete('/deleteOne/:name', function (req, res) {
    //res.end('Delete API, ' + req.body.name)

    MongoClient.connect(url, (err, client) => {
        client.db(dbName)
            .collection('books')
            .deleteOne({ 'name': req.params.name }, (err, result) => {
                assert.equal(null, err);
                console.log('Delete a records where book name : ' + req.params.name);

                const response = { response:'OK', result: result.result.n + " Deleted." };
                res.json(response);
            });
        client.close();
    })
});

/**
 * 
 * Function delete any book with matching the book name params
 * @author  sarawutt.b@gmail.com
 */
router.delete('/deleteMany/:name', function (req, res) {
    //res.end('Delete API, ' + req.body.name)

    MongoClient.connect(url, (err, client) => {
        client.db(dbName)
            .collection('books')
            .deleteMany({ 'name': req.params.name }, (err, result) => {
                assert.equal(null, err);
                console.log('Delete a records where book name : ' + req.params.name);
                const response = { response:'OK', result: result.result.n + "Deleted." };
                res.json(response);
            });
        client.close();
    })
});

//Export to the caller module
module.exports = router;