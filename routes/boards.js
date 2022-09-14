// @ts-check
const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo.js');

// 글 전체 목록 보여주기
router.get('/', async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const ARTICLE = await cursor.find({}).toArray();
  const articleLen = ARTICLE.length;
  res.render('boards', { ARTICLE, articleCounts: articleLen });
});

// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('boards_write');
});

// 글 추가 기능 수행
router.post('/write', async (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    await cursor.insertOne(newArticle);
    res.redirect('/boards');
  }
});

// 글 수정 모드로 이동
router.get('/modify/title/:title', async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const selectedArticle = await cursor.findOne({ title: req.params.title });
  res.render('boards_modify', { selectedArticle });
});

// 글 수정 기능 수행 modify url추가
router.post('/title/:title', async (req, res) => {
  if (req.body.title && req.body.content) {
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    cursor.updateOne(
      { title: req.params.title },
      { $set: { title: req.body.title, content: req.body.content } }
    );
    res.redirect('/boards');
  }
});

// 글 삭제 기능 수행
router.delete('/delete/title/:title', async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  await cursor.deleteOne({ title: req.params.title });
  res.send('삭제완료');
});

module.exports = router;
