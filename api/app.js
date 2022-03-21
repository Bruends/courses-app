const express = require('express');
const cors = require('cors');
const coursesRouter = require('./src/routes/courseRoutes');
require('dotenv').config();

//express config
const app = express();
app.use(cors());
app.use(express.json());

// routers
app.use('/courses', coursesRouter);

app.listen(3000, () => {
    console.log(`app running on: localhost:${process.env.APP_PORT}/`);
});
