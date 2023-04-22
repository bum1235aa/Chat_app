const express = require('express')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { Console } = require('console');


const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chat_app'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
// template engine
app.engine('hbs', handlebars.engine({
  defaultLayout : 'main',
  extname : '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home')
})

// ---------------Register-----------------

// Sử dụng body-parser middleware để parse request body
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/register', async (req, res) => {
//   // get user input
//   const { username, email, password } = req.body;

//   User.findOne({ email}, (err, user) => {
//     if(err) {
//       console.error(err);
//       return res.status(500).send('Internal server error');
//     }
//     //Check email exists
//     if (user) {
//       return res.status(400).send('Email has already been taken');
//     }

//     // create a new user
//     const newUser = new User({
//       username,
//       email,
//       password,
//     });

//     // Save user into database
//     newUser.save(err => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Internal server error');
//       }
//       return res.status(201).send('User has been created');
//     });
//   });
// });


app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.length > 0) {
      res.render('home',{user:`${username}`,login:true});
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  });
});

app.get('/register', (req, res) => {
    res.render('register')
  })
app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  db.query(`INSERT INTO users (username, password) VALUES ('${username}','${password})'`, (err, results) => {
    if (err) {
      console.log(err)
      throw err;
    }
    if (results.length > 0) {
      res.render('home',{user:`${username}`,login:true});
    } 
  });
});


http.listen(port, () => {
  console.log(`App listening on port ${port}`)
})