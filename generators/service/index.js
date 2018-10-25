'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('services', {
      type: Array,
      required: true
    });
  }

  writing() {
    const services = this.options.services;

    for (let i = 0; i < services.length; i++) {
      const service = services[i];

      this.fs.copyTpl(
        this.templatePath('_function.json'),
        this.destinationPath(service + '/function.json'),
        { service: service }
      );

      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath(service + '/index.js')
      );
    }
  }
};
