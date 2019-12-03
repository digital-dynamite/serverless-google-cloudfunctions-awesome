'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  setDefaults() {
    this.options.stage = _.get(this, 'options.stage') || _.get(this, 'serverless.service.provider.stage') || 'dev';
    this.options.region = _.get(this, 'options.region', 'us-central1');
    this.options.runtime = _.get(this, 'options.runtime', 'nodejs8');

    // Normalize booleans, since they're passed as strings
    if (this.options.prependStage === 'false') {
      this.options.prependStage = false;
    }

    if (this.options.prependStage === 'true') {
      this.options.prependStage = true;
    }

    if (this.options.prependService === 'false') {
      this.options.prependService = false;
    }

    if (this.options.prependService === 'true') {
      this.options.prependService = true;
    }

    const optPrependStage = _.get(this, 'options.prependStage');
    const optPrependService = _.get(this, 'options.prependService');

    this.options.prependStage = _.isBoolean(optPrependStage) ? optPrependStage : _.get(this, 'serverless.service.provider.prependStage', false);
    this.options.prependService = _.isBoolean(optPrependService) ? optPrependService : _.get(this, 'serverless.service.provider.prependService', false);

    const optPrefix = _.get(this, 'options.prefix');

    this.options.prefix = _.isString(optPrefix) ? optPrefix : _.get(this, 'serverless.service.provider.prefix');

    return BbPromise.resolve();
  },
};
