const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./config/logger');
require("dotenv").config();
require("./db").connectToMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is healthy',
        pid: process.pid,
        uptime: process.uptime(),
    });
});

app.use('/api/v1/', require('./routes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    logger.info(`server is running on port ${PORT}`);
})


module.exports = app;
