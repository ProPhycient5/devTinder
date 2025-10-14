const { MongoClient } = require('mongodb');

const url = "mongodb+srv://dsawanoffice8:78BuczlCtmmflnGk@backenddb.rac4jwd.mongodb.net/";

const client = new MongoClient(url);

const dbName = 'Helloworld';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');

    //insert
    const data = {
        firstname: "Harleen",
        lastname: "Singh",
        city: "Punjab",
        gender: "Female"
    }

    const insertResult = await collection.insertOne(data);
    console.log('Inserted documents =>', insertResult);

    //Read
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    //Update
    const updateResult = await collection.updateOne({ firstname: "Vikram" }, { $set: { city: "J&K" } });
    console.log('Updated documents =>', updateResult);

    //Delete
    const deleteResult = await collection.deleteMany({ firstname: "Harleen" });
    console.log('Deleted documents =>', deleteResult);

    // the following code examples can be pasted here...

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());