'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  setDefaults() {
    this.options.stage = _.get(this, 'options.stage', 'dev');
    this.options.region = _.get(this, 'options.region', 'us-central1');

    const optPrependStage = _.get(this, 'options.prependStage');
    const optPrependService = _.get(this, 'options.prependService');

    this.options.prependStage = _.isBoolean(optPrependStage) ? optPrependStage : _.get(this, 'serverless.service.provider.prependStage', false);
    this.options.prependService = _.isBoolean(optPrependService) ? optPrependService : _.get(this, 'serverless.service.provider.prependService', false);

    return BbPromise.resolve();
  },
};
