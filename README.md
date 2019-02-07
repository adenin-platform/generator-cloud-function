# generator-cloud-function
> Generate a boilerplate adenin cloud function repo

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cloud-function using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @adenin/generator-cloud-function
```

## Usage

Generate your new project:

```bash
yo @adenin/cloud-function my-project
```

This will generate a folder `my-project` in your current directory, containing the boilerplate.

By default, it will contain no boilerplate for individual activities. These can be specified by supplying additional arguments:

```bash
yo @adenin/cloud-function my-project myactivity:sql myotheractivity:empty
```

After generation in this case, the _activities_ subfolder will be populated with boilerplate for two activities, `myactivity` and `myotheractivity`, which use SQL and empty templates respectively. It will also generate the `function.json` necessary to use Azure functions deployment.

## Adding to an existing project

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

To update the infrastructure of a cloud function repo to a newer version, use the update subgenerator:

```bash
npm update -g @adenin/generator-cloud-function

cd my-cloud-function

yo @adenin/cloud-function:update
```
Check any override warnings to ensure that none of your own code is going to be overwritten.

## Using the repo as a hybrid v1 connector

Generation will also create `.yaml` configuration files which affect behaviour in v1 only.

The process of creating a hybrid connector within v1 is much the same as above, and from start to end, might look like:

```bash
npm install -g @adenin/generator-cloud-function

cd SpacesLocal\\Global\\Connectors

yo @adenin/cloud-function my-hybrid-connector ping:empty
```

You'd then end up with a repo as follows:

```
./my-hybrid-connector
├── .vscode
|   └── launch.json
├── activities
|   ├── common
|   |    ├── api.js
|   |    └── utils.js
|   ├── ping.js
|   └── function.json
├── _definition.yaml
├── _service.ping.yaml
├── app.js
└── index.js
```

The connector would be exposed to v1 with name _my-hybrid-connector_ by default, with service _ping_ available, where `ping.js` would only contain empty boilerplate. The YAML configurations could then be altered as normal to adjust the functionality of the connector and service, and another service boilerplate could be added with:

```bash
cd my-hybrid-connector

yo @adenin/cloud-function:activity another:empty
```

Which again would add `another.js` and `_service.another.js`.