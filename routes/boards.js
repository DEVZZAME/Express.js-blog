// @ts-check

const express = require('express');

const router = express.Router();

// MongoDB 설정
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  const users = client.db('kdt1').collection('boards');

  router.get('/board', (req, res) => {
    res.render('board');
  });

  await client.close();
}
main();
module.exports = router;
// console.log(arr);
// const data = users.find({ age: { $gte: 5 } });
// const arr = await data.toArray();
// await client.connect(err);
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
// const data = users.find({ });
// await data.forEach(console.log);
// console.log(data);
