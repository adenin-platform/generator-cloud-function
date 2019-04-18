'use strict';

module.exports = async (activity) => {
  try {
    const message = 'This is an empty activity';

    logger.info(message);

    activity.Response.Data = {
      message: message
    };
  } catch (error) {
    $.handleError(activity, error);
  }
};
