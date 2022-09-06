const express = require('express');

const router = express.Router();

const POSTS = [
  {
    title: 'title01',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'title02',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: 'title03',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

router.get('/', (req, res) => {
  res.render('posts', { POSTS });
});

router.get('/:title', (req, res) => {
  const postData = POSTS.find((post) => post.title === req.params.title);
  if (postData) {
    // ejs 페이지 만들어서 보여주기
    res.send(postData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };
    POSTS.push(newPost);
    res.redirect('/posts');
  } else if (req.body.title && req.body.content) {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    POSTS.push(newPost);
    res.redirect('/posts');
  } else {
    const err = new Error('Unexpected query');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POSTS.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POSTS.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POSTS[arrIndex] = modifyPost;
      res.send('글 수정 완료 ');
    }
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const arrIndex = POSTS.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POSTS.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('TITLE not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
