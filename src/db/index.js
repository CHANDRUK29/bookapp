const mongoose = require('mongoose');
const logger = require('../config/logger');

class DatabaseConnector {
    constructor() {
        this.MONGO_DB_URL = process.env.MONGO_DB_URI
        this.MONGO_RETRY_COUNT = 0;
        this.MONGO_RETRY_LIMIT = 3;
        this.RETRY_LIMIT = 5 * 1000 // 5seconds
    }

    handleDatabaseError(error) {
        if (this.MONGO_RETRY_COUNT < this.MONGO_RETRY_LIMIT) {
            logger.error('MongoDb connection error', error)
            this.MONGO_RETRY_COUNT += 1
            setTimeout(() => {
                logger.info('Retrying')
                this.connectToMongo()
            }, this.RETRY_LIMIT)
        } else {
            logger.error('MongoDb connection Error', error)
            logger.info('Terminating the Process')
            process.exit(0);
        }
    }
    async connectToMongo() {
        try {
            mongoose.connect(this.MONGO_DB_URL).catch((err) => this.handleDatabaseError(err))
            mongoose.connection
                .on('open', () => logger.info('Connected to Mongodb'))
                .on('close', () => logger.error('Disconnected from MongoDb'))

        } catch (error) {
            this.handleDatabaseError(err)
        }
    }
}

const db = new DatabaseConnector()

module.exports = db;