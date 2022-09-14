const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://zzame:zzame1234@cluster0.7b6ewbn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
