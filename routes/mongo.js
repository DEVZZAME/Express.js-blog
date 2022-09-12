const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://zzame:zzame1234@cluster0.7b6ewbn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;

async function main() {
  await client.connect();

  const users = client.db('kdt1').collection('users');

  // await users.deleteMany({});
  // await users.insertMany([
  //   {
  //     id: 'userId01',
  //     name: 'User01',
  //     email: 'user01@blog.com',
  //   },
  //   {
  //     id: 'userId02',
  //     name: 'User02',
  //     email: 'user02@blog.com',
  //   },
  //   {
  //     id: 'userId03',
  //     name: 'User03',
  //     email: 'user03@blog.com',
  //   },
  // ]);
}

main();
