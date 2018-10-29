'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', {
      desc: 'Name for the connector',
      required: false,
      type: String
    });

    this.argument('services', {
      desc: 'Space-separated list of services in format name:template',
      required: false,
      type: Array
    });
  }

  initializing() {
    if (this.options.services) {
      this.composeWith(require.resolve('../service'), {
        arguments: this.options.services
      });
    }
  }

  async prompting() {
    if (!this.options.appname) {
      this.answers = await this.prompt([
        {
          type: 'input',
          name: 'appname',
          message: 'Your connector name:',
          default: 'myconnector'
        },
        {
          type: 'confirm',
          name: 'addservices',
          message: 'Do you want to add a service?',
          default: false
        }
      ]);

      if (this.answers.addservices) {
        this.composeWith(require.resolve('../service'));
      }
    }
  }

  writing() {
    const appname = this.options.appname ? this.options.appname : this.answers.appname;

    this.destinationRoot(this.destinationRoot() + '/' + appname);

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { appname: appname }
    );

    this.fs.copy(
      this.templatePath('gcloudignore'),
      this.destinationPath('.gcloudignore')
    );

    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
    this.fs.copy(this.templatePath('app.js'), this.destinationPath('app.js'));
  }

  install() {
    this.npmInstall();
  }
};
