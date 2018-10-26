'use strict';
const Generator = require('yeoman-generator');

const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('services', {
      desc: 'Space-separated list of services in format name:template',
      required: false,
      type: Array
    });
  }

  async fetchChoices() {
    if (!this.options.services) {
      this.choices = fs
        .readdirSync(this.sourceRoot())
        .filter(file => file.indexOf('action') !== -1)
        .map(file => {
          const type = file.substring(file.indexOf('_') + 1, file.length);

          return {
            name: file.replace('_', ' ').replace('action ' + type, type + ' action'),
            value: type
          };
        });

      this.answers = {};
      this.answers.services = [];
    }
  }

  async addService() {
    if (!this.options.services) {
      const service = await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Service name:'
        },
        {
          type: 'list',
          name: 'template',
          message: 'Service template:',
          choices: this.choices
        },
        {
          type: 'confirm',
          name: 'another',
          message: 'Do you want to add another service?',
          default: false
        }
      ]);

      this.answers.services.push(service);

      if (service.another) await this.addService();
    }
  }

  writing() {
    let services;

    if (this.options.services) {
      services = this.options.services.map(service => {
        const split = service.split(':');

        return {
          name: split[0],
          template: split[1]
        };
      });
    } else {
      services = this.answers.services;
    }

    for (let i = 0; i < services.length; i++) {
      const name = services[i].name;
      const type = services[i].template;

      this.fs.copyTpl(
        this.templatePath('_function.json'),
        this.destinationPath(name + '/function.json'),
        { service: name }
      );

      this.fs.copy(this.templatePath('action_' + type), this.destinationPath(name));
    }
  }
};
