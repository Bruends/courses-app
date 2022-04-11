const express = require('express');
const cors = require('cors');
const coursesRouter = require('./src/routes/courseRoutes');
const authRouter = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');
const logger = require('./src/utils/logger');

require('dotenv').config();

//express config
const app = express();
app.use(cors());
app.use(express.json());

// routers and middlewares
app.use('/auth', authRouter);
app.use('/courses', authMiddleware);
app.use('/courses', coursesRouter);

app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.sendStatus(500);
});

app.listen(process.env.APP_PORT, () => {
   logger.info(`app running on: localhost:${process.env.APP_PORT}/`);
});
