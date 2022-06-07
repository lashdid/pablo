const { MongoClient } = require("mongodb");

const { MONGO_URI, DB_NAME } = process.env;
let client, db;

export async function connect() {
  if (client && db) {
    return { db, client };
  }

  client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  db = client.db(DB_NAME);
  return { db, client };
}
