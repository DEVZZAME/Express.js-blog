const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

async function getPosts() {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('post').find();
  const data = await cursor.toArray();
  return data;
}

async function updatePosts(data) {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('post');
  await cursor.deleteMany({});
  await cursor.insertMany(data);
  const dbs = client.db('kdt1').collection('post').find();
  const result = await dbs.toArray();
  return result;
}

// POSTS 글목록 페이지
router.get('/', async (req, res) => {
  const POSTS = await getPosts();
  res.render('posts', { POSTS });
});

router.get('/add', async (req, res) => {
  const POSTS = await getPosts();
  res.render('posts_add.ejs', { POSTS });
});

// POSTS 상세 페이지
router.get('/:title', async (req, res) => {
  const POSTS = await getPosts();
  const postData = POSTS.find((post) => post.title === req.params.title);
  if (postData) {
    res.render('posts_detail.ejs', { POSTS: postData });
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  // 글번호
  const count = await client
    .db('kdt1')
    .collection('counter')
    .findOne({ name: 'numberOfPosts' });
  const totalPost = count.totalPost;
  // 게시물
  const POSTS = await getPosts();
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        _id: totalPost + 1,
        title: req.query.title,
        content: req.query.content,
      };
      POSTS.push(newPost);
      await updatePosts(POSTS);
      res.redirect('/posts');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        _id: totalPost + 1,
        title: req.body.title,
        content: req.body.content,
      };
      POSTS.push(newPost);
      await updatePosts(POSTS);
      res.redirect('/posts');
    }
  }
});

router.get('/edit/:_id', async (req, res) => {
  const POSTS = await getPosts();
  const postData = POSTS.find((post) => post._id === parseInt(req.params._id));
  res.render('posts_edit.ejs', { POSTS: postData });
});

router.post('/edit', async (req, res) => {
  const client = await mongoClient.connect();
  // 글번호
  const count = await client
    .db('kdt1')
    .collection('post')
    .updateOne(
      { _id: parseInt(req.body.id) },
      { $set: { title: req.body.title, content: req.body.content } },
      function (err, result) {
        console.log(result);
        res.redirect('/posts');
      }
    );
});

router.delete('/:title', async (req, res) => {
  const POSTS = await getPosts();
  const arrIndex = POSTS.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POSTS.splice(arrIndex, 1);
    const result = await updatePosts(POSTS);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('TITLE not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;

// if (req.query.title && req.query.content) {
//   const postData = POSTS.find((post) => post.title === req.params.title);
//   if (postData) {
//     const arrIndex = POSTS.findIndex(
//       (post) => post.title === req.params.title
//     );
//     const modifyPost = {
//       title: req.query.title,
//       content: req.query.content,
//     };
//     POSTS[arrIndex] = modifyPost;
//     res.send('글 수정 완료 ');
//   }
// } else {
//   const err = new Error('ID not found');
//   err.statusCode = 404;
//   throw err;
// }
