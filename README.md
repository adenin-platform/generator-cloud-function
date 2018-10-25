# generator-adenin-cloud-connector
> Generate a boilerplate adenin cloud function connector

## Installation

First, install [Yeoman](http://yeoman.io) and generator-adenin-cloud-connector using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-adenin-cloud-connector
```

Then generate your new project:

```bash
yo adenin-cloud-connector my-project
```

This will generate a folder `my-project` in your current directory, containing the boilerplate.

By default, it will contain no boilerplate for connector services. These can be specified by supplying additional arguments:

```bash
yo adenin-cloud-connector my-project myservice myotherservice
```

This will generate a project containing subfolders with boilerplate for two services (functions), `myservice` and `myotherservice`.

From within an existing repo, you can add additional service boilerplate using the service subgenerator as follows:

```bash
# make sure you're in your project folder
cd my-project 

# generate one or more services with the given names
yo adenin-cloud-connector:service myfirstservice mysecondservice
```

Once generated, you simply need to implement your function behaviour in `/servicename/index.js`, and the remainder of the files can be left alone.

