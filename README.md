# generator-cloud-function
> Generate a boilerplate adenin cloud function repo

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cloud-function using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @adenin/generator-cloud-function
```

Then generate your new project:

```bash
yo @adenin/cloud-function my-project
```

This will generate a folder `my-project` in your current directory, containing the boilerplate.

By default, it will contain no boilerplate for individual activities. These can be specified by supplying additional arguments:

```bash
yo @adenin/cloud-function my-project myactivity:sql myotheractivity:empty
```

This will generate a project containing an _activities_ subfolder with boilerplate for two activities, `myactivity` and `myotheractivity`, which use SQL and empty templates respectively. It will also generate the `function.json` necessary to use Azure functions deployment.

From within an existing repo, you can add a new activity boilerplate using the activity subgenerator as follows:

```bash
# make sure you're in your project folder
cd my-project 

# generate one or more services with the given names
yo @adenin/cloud-function:activity myfirstactivity:card mysecondactivity:sql
```

Once generated, you simply need to implement your function behaviour in `./activities/{functionName}.js`, and the remainder of the files can be left alone.

You can also run either of the commands without arguments to construct boilerplate through prompting interface:

```bash
yo @adenin/cloud-function

yo @adenin/cloud-function:activity
```

Generation will also create `.yaml` configuration files which affect behaviour in v1 only.

To update the infrastructure of a cloud function repo to a new version, use the update subgenerator:

```bash
cd my-cloud-function

yo @adenin/cloud-function:update
```
Check any override warnings to ensure that none of your own code is going to be overwritten.
