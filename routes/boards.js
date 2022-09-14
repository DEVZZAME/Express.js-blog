// @ts-check
const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
];

// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  const articleLen = ARTICLE.length;
  res.render('boards', { ARTICLE, articleCounts: articleLen });
});

// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('boards_write');
});

// 글 추가 기능 수행
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/boards');
  } else {
    const err = new Error('요청이상');
    err.statusCode = 404;
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/title/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (_article) => _article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrIndex];

  res.render('boards_modify', { selectedArticle });
});

// 글 수정 기능 수행
router.post('/title/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (_article) => _article.title === req.params.title
    );
    if (arrIndex !== -1) {
      ARTICLE[arrIndex].title = req.body.title;
      ARTICLE[arrIndex].content = req.body.content;
      res.redirect('/boards');
    } else {
      const err = new Error('요청하신 제목이 없습니다.');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('요청 쿼리 이상');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제 기능 수행
router.delete('/title/:title', (req, res) => {});

module.exports = router;
