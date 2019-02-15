'use strict';

const logger = require('@adenin/cf-logger');
const handleError = require('@adenin/cf-activity').handleError;

module.exports = async (activity) => {
    try {
        const message = 'This is a card action activity';

        logger.info(message);

        activity.Response.Data = {
            message: message
        };
    } catch (error) {
        handleError(error, activity);
    }
};
