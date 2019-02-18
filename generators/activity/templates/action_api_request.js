'use strict';

const api = require('./common/api');
const logger = require('@adenin/cf-logger');
const cfActivity = require('@adenin/cf-activity');

module.exports = async (activity) => {

    try {
        api.initialize(activity); // initialize api context

        const response = await api('/ip'); // *todo* provide endpoint
        if (!cfActivity.isResponseOk(activity, response)) return;

        logger.info("received", response.body);

        activity.Response.Data = response.body;

    } catch (error) {
        // handle generic exception
        cfActivity.handleError(activity, error);
    }
};
