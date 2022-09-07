// MongoDB 설정
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  // 'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';
  'mongodb+srv://zzame:zzame1234@cluster0.7b6ewbn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  // await client.connect(err);
  const users = client.db('kdt1').collection('users');
  // await users.deleteMany({});
  // await users.updateOne({ age: 4 }, { $set: { age: 40 } });
  // await users.updateMany({ age: { $lte: 5 } }, { $set: { age: 4, old: 'no' } });
  // await users.deleteMany({
  //   age: { $gte: 5 },
  // });
  // await users.deleteOne({ name: 'pororo' });
  // await users.insertOne({
  //   name: 'hansol',
  //   age: 'idk',
  // });
  // await users.insertMany([
  //   {
  //     name: 'pororo',
  //     age: 5,
  //   },
  //   {
  //     name: 'loopy',
  //     age: 6,
  //   },
  //   {
  //     name: 'crong',
  //     age: 4,
  //   },
  // ]);
  const data = users.find({ age: { $gte: 5 } });
  // const data = users.find({ });
  // await data.forEach(console.log);
  const arr = await data.toArray();
  // console.log(data);
  console.log(arr);
  await client.close();
}
main();
