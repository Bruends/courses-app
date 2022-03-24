const pino = require('pino');

const logger = pino({
    enabled: true,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

module.exports = logger;