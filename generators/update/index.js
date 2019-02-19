'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('../../app/templates/index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copy(
      this.templatePath('../../app/templates/app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copy(
      this.templatePath('../../app/templates/function.json'),
      this.destinationPath('activities/function.json')
    );

    this.fs.copy(
      this.templatePath('../../app/templates/launch.json'),
      this.destinationPath('.vscode/launch.json')
    );

    this.fs.copy(
      this.templatePath('../../app/templates/settings.json'),
      this.destinationPath('.vscode/settings.json')
    );

    this.fs.copy(
      this.templatePath('../../app/templates/host.json'),
      this.destinationPath('host.json')
    );
  }

  install() {
    this.spawnCommand('npm', ['install', '@adenin/cf-activity']);
    this.spawnCommand('npm update');
  }
};
