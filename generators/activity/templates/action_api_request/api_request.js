'use strict';

const logger = require('@adenin/cf-logger');
const api = require('./common/api');

module.exports = async (activity) => {
  try {
    api.initialize(activity); // initialize api context

    const response = await api('/ip'); // *todo* provide endpoint

    if (!api.isResponseOk(activity, response)) {
      return;
    }

    logger.info('received', response.body);

    activity.Response.Data = response.body;
  } catch (error) {
    // handle generic exception
    api.handleError(activity, error);
  }
};
