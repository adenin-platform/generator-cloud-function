'use strict';

const api = require('./common/api');

module.exports = async () => {
  try {
    const response = await api('/ip'); // *todo* provide endpoint

    if (Activity.isErrorResponse(response)) return;

    logger.info('received', response.body);

    Activity.Response.Data = response.body;
  } catch (error) {
    // handle generic exception
    Activity.handleError(error);
  }
};
