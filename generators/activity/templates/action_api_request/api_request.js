'use strict';

const api = require('./common/api');

module.exports = async (activity) => {
  try {
    api.initialize(activity);

    const response = await api('/ip'); // *todo* provide endpoint

    if ($.isErrorResponse(activity, response)) return;

    logger.info('received', response.body);

    activity.Response.Data = response.body;
  } catch (error) {
    // handle generic exception
    $.handleError(activity, error);
  }
};
