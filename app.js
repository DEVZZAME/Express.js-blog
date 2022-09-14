// @ts-check
const express = require('express');
const app = express();

// DOTENV
// require('dotenv').config();

const PORT = 8080;

// Form 데이터 전송
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 템플릿 엔진 지정
app.set('view engine', 'ejs');
// app.set('views', 'viwes');

// STATIC 사용하여 디렉토리별 역할 지정
app.use(express.static('views'));
app.use(express.static('public'));

// 라우터 관리
const router = require('./routes/index');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/boards');

// 라우터별 라우팅
app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/boards', boardRouter);

// 에러 핸들링
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
