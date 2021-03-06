## Contributing

### Building

Open a terminal window.

Clone the davinci-eight repo:
```
git clone git://github.com/geometryzen/davinci-eight.git
```

Change to the repo directory:
```
cd davinci-eight
```

Install NPM:
```
yarn install
yarn upgrade
```
to install the tooling dependencies (For this you need to have [Node.js](http://nodejs.org) installed).

```
yarn build
```
to compile the source using the TypeScript compiler (For this you need to have [TypeScript](http://www.typescriptlang.org) installed) and to package the individual files into a single JavaScript file.

## Making Changes

Make your changes to the TypeScript files in the _src_ directory. Do not edit the files in the _dist_ directory, these files will be generated.

## Testing

```
karma start
```

## Versioning

The following files should be changed.

```
package.json
src/davinci-eight/config.ts
```

## Git

```
git add --all
git commit -m '...'
git tag -a 1.2.3 -m '...'
git push origin master --tags
npm publish
```