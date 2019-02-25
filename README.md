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

Which again would add `another.js` and `_service.another.yaml`.

The generator will automatically run `npm install` upon completion.

## Developing with the cf dependencies locally (cf-provider, cf-activity, cf-logger)

For the generator to reflect any changes made to one of the three common dependencies, any changes must be published to npm. You will therefore also need to develop and test locally with the repos beforehand.

### Link your function repo to the development dependency clone

When developing with the dependencies, you probably want your function repo to reflect the changes you are making without having to manually edit require statements, copy and paste changes, or publish unstable versions to npm itself. This can be achieved by using the `npm link` functionality as follows:

```bash
# clone the dependency you want to update, e.g. cf-activity
git clone https://github.com/adenin-platform/cf-activity

cd cf-activity

# link the clone to a global node_modules installation
npm link
```

You will now have a global installation of the module which actually references the development folder, and any changes to the code will be immediately reflected. Next is to tell your function repo to now refer to this local installation:

```bash
# cd into your function repo
cd my-function

# tell the repo to reference the previously created link (cf-activity in this example)
npm link @adenin/cf-activity
```

Your function repo will now be calling the scripts in your local development clone of the dependency, and during debugging in VS code, breakpoints within your dependency clone should also be hit. Once you have finished testing your changes and want to reset your function repo to refer the the published npm package again, do the following:

```bash
# enter your function repo
cd my-function

# reinstall the dependency from npm
npm uninstall --no-save @adenin/cf-activity && npm install 
```

The `npm unlink` command is only an alias for `npm uninstall` and so running it will not simply undo the linking process, but uninstall the dependency completely. So instead use the above process to reinstall from npm without affecting your `package.json`.

> If the module you are linking depends on another local module that you want to develop and debug simultaneously - e.g. _cf-logger_ could be such a case - you need to work through the steps in this section once for each level of project nesting.
>
>For example with _cf-logger_, first linking it to a global reference, then linking your copy of _cf-activity_ and/or _cf-provider_ to that reference, then linking those to a global reference, before finally linking your function repo to those references.

### Updating one of the dependencies

For the updates to the dependencies to be installable by other users, and for the generator to install them upon next use, they must be re-published to npm.

The process is as follows (using cf-activity as an example, but same for all repos):

```bash
# go into the local repo clone where you have been making changes
cd cf-activity

# commit them
git add .
git commit -m "my changes"

# increment npm version and publish
npm version patch # or 'minor' for new features, 'major' for breaking API changes (see below)
npm publish

# push to git to reflect changes + new version number
git push origin master

# go into the function repo and fetch the new changes
cd my-cloud-function

npm update
# OR
yo @adenin/cloud-function:update # (also apply any changes to generator)
```

#### Major npm versions

If the changes break the API of the module, npm version should be incremented by 'major' number. To avoid accidentally breaking existing function repos, neither `npm update`, nor the update subgenerator, will fetch new major versions. 

The major version number will have to be explicitly specified to the npm update command to override this, or the generator will need to be changed to ensure the API changes are addressed, then have it's `package.json` template, and update subgenerator npm commands, updated to allow the new major version.
