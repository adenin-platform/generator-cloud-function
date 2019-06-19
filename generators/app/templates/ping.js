'use strict';

const api = require('./common/api');

module.exports = async (activity) => {
  try {
    api.initialize(activity);

    activity.Response.Data = {
      success: false
    };
  } catch (error) {
    $.handleError(activity, error);
    activity.Response.Data.success = false;
  }
};
