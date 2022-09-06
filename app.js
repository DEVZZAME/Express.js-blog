// @ts-check
const express = require('express');
const app = express();

// Form 데이터 전송
app.use(express.urlencoded({ extended: true }));

// 템플릿 엔진 지정
app.set('view engine', 'ejs');

// STATIC 사용하여 디렉토리별 역할 지정
app.use(express.static('views'));
app.use(express.static('public'));

// 포트 지정
const PORT = 4000;

// 라우터 관리
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// 라우터별 라우팅
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.get('/', (req, res) => {
  res.render('index');
});

// postsRouter.get('/', (req, res) => {
//   res.send('블로그 글 목록');
// });
// postsRouter.post('/:title', (req, res) => {
//   res.send(`제목이 ${req.params.title} 인 글이 등록 되었습니다.`);
// });

// 에러 핸들링
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
