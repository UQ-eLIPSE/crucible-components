# Crucible Components

This is a project for creating crucible components that will be used as part of the Crucible Repository.

Node version requirement: 20.11

## Install Project as a package

- `yarn add https://github.com/UQ-eLIPSE/crucible-components.git#release-package`

- Import plugin:

  1. find `main.ts` in plugin host project and add:
     `import { createViewerPlugin } from "crucible-components"`,
     `import "crucible-components/dist/styles.css"`,

     `createViewerPlugin(app, {dataLink: await Api.Resource.getQuestions() });`

  2. in the component, implement the following directly:
     <CrucibleComponent />

### Build Project as a package

```sh
BUILDASLIBRARY=true yarn build
```

or

```sh
yarn build:lib
```

### Run test app

```sh
yarn serve:test
```
