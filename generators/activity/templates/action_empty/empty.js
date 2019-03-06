'use strict';

const logger = require('@adenin/cf-logger');
const api = require('./common/api');

module.exports = async (activity) => {
  try {
    const message = 'This is an empty activity';

    logger.info(message);

    activity.Response.Data = {
      message: message
    };
  } catch (error) {
    api.handleError(activity, error);
  }
};
