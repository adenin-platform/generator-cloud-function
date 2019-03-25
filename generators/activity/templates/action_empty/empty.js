'use strict';

const api = require('./common/api');

module.exports = async (activity) => {
  try {
    const message = 'This is an empty activity';

    logger.info(message);

    Activity.Response.Data = {
      message: message
    };
  } catch (error) {
    api.handleError(error);
  }
};
