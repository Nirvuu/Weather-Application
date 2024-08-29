const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(session({
  secret: 'abcd1234efgh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true} 
}));

const JWT_SECRET = 'abcd1234efgh';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  res.json({ token, user: { username, email } });
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  res.json({ token });
});


app.get('/weather', authenticateToken, async (req, res) => {
  res.json({ message: 'You are authorized to access the weather data' });
});

app.get('/forecast', authenticateToken, (req, res) => {
  res.json({ message: 'You are authorized to access the forecast data' });
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
