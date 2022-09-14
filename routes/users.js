const express = require('express');

const router = express.Router();

const mongoClient = require('./client');

const methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'));

async function getUsers() {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('users').find();
  const data = await cursor.toArray();
  return data;
}

async function updateUsers(data) {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('users');
  await cursor.deleteMany({});
  await cursor.insertMany(data);
  const dbs = client.db('kdt1').collection('users').find();
  const result = await dbs.toArray();
  return result;
}

// const USER = [
//   {
//     id: 'userId01',
//     name: 'userName01',
//     email: 'user01@test.com',
//   },
//   {
//     id: 'userId02',
//     name: 'userName02',
//     email: 'user02@test.com',
//   },
//   {
//     id: 'userId03',
//     name: 'userName03',
//     email: 'user03@test.com',
//   },
// ];

router.get('/', async (req, res) => {
  const USER = await getUsers();
  res.render('users', {
    USER,
    imgUrl:
      'http://pds27.egloos.com/pds/201407/21/10/d0038310_53cca3c8e3d81.gif',
  });
});

router.get('/:id', async (req, res) => {
  const USER = await getUsers();
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/edit/:id', async (req, res) => {
  const USER = await getUsers();
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.render('edit.ejs', { userData });
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

// router.get("/edit/:id", function (요청, 응답) {
//   db.collection("post").findOne(
//     { _id: parseInt(요청.params.id) },
//     function (에러, 결과) {
//       console.log(결과);
//       응답.render("edit.ejs", { post: 결과 });
//     }
//   );
// });

router.post('/', async (req, res) => {
  const USER = await getUsers();
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

router.put('/edit/:id', async (req, res) => {
  const USER = await getUsers();
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
      await updateUsers(USER);
      res.render('users');
    }
  } else if (req.body) {
    res.send('success');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});
router.delete('/:id', async (req, res) => {
  const USER = await getUsers();
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    const result = await updateUsers(USER);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
