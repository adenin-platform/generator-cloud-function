'use strict';

module.exports = async () => {
  try {
    const message = 'This is an empty activity';

    logger.info(message);

    Activity.Response.Data = {
      message: message
    };
  } catch (error) {
    Activity.handleError(error);
  }
};
