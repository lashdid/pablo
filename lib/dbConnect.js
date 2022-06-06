const {MongoClient} = require('mongodb');

export async function connect(){
    const {MONGO_URI, DB_NAME} = process.env
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db(DB_NAME)
    return {db, client}
}