// let's go!
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode JWT so we can get user ID
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  // Video 26 explains cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // put userId onto req for future request to access
    req.userId = userId;
  }
  next();
});

// populate logged in user
server.express.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }

  const user = await db.query.user(
    { where: { id: req.userId } },
    '{id, permissions, email, name}'
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port ${deets.port}`);
  }
);
