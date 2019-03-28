'use strict';
const Generator = require('yeoman-generator');

const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('activities', {
      desc: 'Space-separated list of activities in format name:template',
      required: false,
      type: Array
    });
  }

  async fetchChoices() {
    if (!this.options.activities) {
      this.choices = fs
        .readdirSync(this.sourceRoot())
        .filter(file => file.indexOf('action') !== -1)
        .map(file => {
          const type = file.substring(file.indexOf('_') + 1, file.length);

          return {
            name: file
              .replace(/_/g, ' ')
              .replace(
                'action ' + type.replace(/_/g, ' '),
                type.replace(/_/g, ' ') + ' action'
              ),
            value: type
          };
        });

      this.answers = {};
      this.answers.activities = [];
    }
  }

  async addActivity() {
    if (!this.options.activities) {
      const activity = await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Activity name:'
        },
        {
          type: 'list',
          name: 'template',
          message: 'Activity template:',
          choices: this.choices
        },
        {
          type: 'confirm',
          name: 'another',
          message: 'Do you want to add another activity?',
          default: false
        }
      ]);

      this.answers.activities.push(activity);

      if (activity.another) await this.addActivity();
    }
  }

  writing() {
    let activities;

    if (this.options.activities) {
      activities = this.options.activities.map(activity => {
        const split = activity.split(':');

        return {
          name: split[0],
          template: split[1]
        };
      });
    } else {
      activities = this.answers.activities;
    }

    for (let i = 0; i < activities.length; i++) {
      const name = activities[i].name;
      const type = activities[i].template;

      this.fs.copyTpl(
        this.templatePath('action_' + type + '/__service.' + type + '.yaml'),
        this.destinationPath('_service.' + name + '.yaml'),
        { name: name }
      );

      this.fs.copy(
        this.templatePath('action_' + type + '/' + type + '.js'),
        this.destinationPath('activities/' + name + '.js')
      );
    }
  }
};
