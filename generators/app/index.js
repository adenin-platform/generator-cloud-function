'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', {
      desc: 'Name for the cloud function',
      required: false,
      type: String
    });

    this.argument('activities', {
      desc: 'Space-separated list of activities in format name:template',
      required: false,
      type: Array
    });
  }

  initializing() {
    const files = fs.readdirSync(this.destinationPath());

    for (let i = 0; i < files.length; i++) {
      if (files[i].indexOf('_definition.yaml') !== -1) {
        this.options.isInitialised = true;
      }
    }

    if (this.options.activities) {
      this.composeWith(require.resolve('../activity'), {
        arguments: this.options.activities
      });
    }
  }

  async prompting() {
    if (!this.options.appname && !this.options.isInitialised) {
      this.answers = await this.prompt([
        {
          type: 'input',
          name: 'appname',
          message: "Your cloud function's name:",
          default: 'myfunction'
        },
        {
          type: 'confirm',
          name: 'addactivities',
          message: 'Do you want to add an activity?',
          default: false
        }
      ]);
    }

    if (this.options.isInitialised) {
      this.answers = await this.prompt([
        {
          type: 'confirm',
          name: 'addactivities',
          message: 'Do you want to add an activity?',
          default: false
        }
      ]);
    }

    if (this.answers.addactivities) {
      this.composeWith(require.resolve('../activity'));
    }
  }

  writing() {
    if (this.options.isInitialised) {
      return;
    }

    const appname = this.options.appname ? this.options.appname : this.answers.appname;

    this.destinationRoot(this.destinationRoot() + '/' + appname);

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { appname: appname }
    );

    this.fs.copyTpl(
      this.templatePath('__definition.yaml'),
      this.destinationPath('_definition.yaml'),
      { appname: appname }
    );

    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), {
      appname: appname
    });

    this.fs.copy(
      this.templatePath('gcloudignore'),
      this.destinationPath('.gcloudignore')
    );

    this.fs.copy(
      this.templatePath('function.json'),
      this.destinationPath('activities/function.json')
    );

    this.fs.copy(
      this.templatePath('api.js'),
      this.destinationPath('activities/common/api.js')
    );

    this.fs.copy(
      this.templatePath('launch.json'),
      this.destinationPath('.vscode/launch.json')
    );

    this.fs.copy(
      this.templatePath('settings.json'),
      this.destinationPath('.vscode/settings.json')
    );

    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('host.json'), this.destinationPath('host.json'));
    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
    this.fs.copy(this.templatePath('app.js'), this.destinationPath('app.js'));
  }

  install() {
    if (!this.options.isInitialised) {
      this.npmInstall();
    }
  }
};
