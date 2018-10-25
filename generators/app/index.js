'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', {
      type: String,
      required: true,
      desc: 'Connector name'
    });

    this.argument('services', {
      type: Array,
      required: false
    });
  }

  initializing() {
    if (this.options.services) {
      this.composeWith(require.resolve('../service'), {
        arguments: this.options.services
      });
    }
  }

  writing() {
    this.destinationRoot(this.destinationRoot() + '/' + this.options.appname);

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { appname: this.options.appname }
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
