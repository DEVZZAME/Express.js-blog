const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'userId01',
    name: 'userName01',
    email: 'user01@test.com',
  },
  {
    id: 'userId02',
    name: 'userName02',
    email: 'user02@test.com',
  },
  {
    id: 'userId03',
    name: 'userName03',
    email: 'user03@test.com',
  },
];

router.get('/', (req, res) => {
  res.render('users', {
    USER,
    imgUrl:
      'http://pds27.egloos.com/pds/201407/21/10/d0038310_53cca3c8e3d81.gif',
  });
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body) {
      console.log(`----------${req.body.id}----------`);
      if (req.body.id && req.body.name && req.body.email) {
        const newUser = {
          id: req.body.id,
          name: req.body.name,
          email: req.body.email,
        };
        USER.push(newUser);
        res.redirect('/users');
      }
    }
  }
});

router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료 ');
    }
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});
router.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
