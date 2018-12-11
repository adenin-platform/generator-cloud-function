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

By default, it will contain no boilerplate for individual functions. These can be specified by supplying additional arguments:

```bash
yo @adenin/cloud-function my-project myfunction:sql myotherfunction:empty
```

This will generate a project containing subfolders with boilerplate for two functions, `myservice` and `myotherservice`, which use SQL and empty templates respectively.

From within an existing repo, you can add a new function boilerplate using the service subgenerator as follows:

```bash
# make sure you're in your project folder
cd my-project 

# generate one or more services with the given names
yo @adenin/cloud-function:service myfirstfunction:card mysecondfunction:sql
```

Once generated, you simply need to implement your function behaviour in `/functionname/index.js`, and the remainder of the files can be left alone.

You can also run either of the commands without arguments to construct boilerplate through prompting interface:

```bash
yo @adenin/cloud-function

yo @adenin/cloud-function:service
```

