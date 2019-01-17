'use strict';

const logger = require('@adenin/cf-logger');

module.exports = async (activity) => {
    try {
        // Card action
        const message = 'This is a card action activity';

        logger.info(message);
        
        activity.Response.Data = {
            message: message
        };
    } catch (error) {
        let m = error.message;

        if (error.stack) {
            m = m + ': ' + error.stack;
        }

        activity.Response.ErrorCode = (error.response && error.response.statusCode) || 500;

        activity.Response.Data = {
            ErrorText: m
        };
    }
};
