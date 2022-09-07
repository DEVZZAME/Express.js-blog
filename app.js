// @ts-check
const express = require('express');
const app = express();

// Form 데이터 전송
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 템플릿 엔진 지정
app.set('view engine', 'ejs');

// MongoDB 설정
// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(
//   'mongodb+srv://zzame:zzame1234@cluster0.7b6ewbn.mongodb.net/?retryWrites=true&w=majority',
//   function (에러, client) {
//     if (에러) {
//       return console.log(에러);
//     }

//     db = client.db('todoapp');

//     app.listen(8080, function () {
//       console.log('listening on 8080');
//     });
//   }
// );
// const { MongoClient, ServerApiVersion } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ServerApiVersion = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://zzame:zzame1234@cluster0.7b6ewbn.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});

// STATIC 사용하여 디렉토리별 역할 지정
app.use(express.static('views'));
app.use(express.static('public'));

// 포트 지정
const PORT = 4000;

// 라우터 관리
const router = require('./routes/index');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// 라우터별 라우팅
app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postsRouter);

// 에러 핸들링
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
