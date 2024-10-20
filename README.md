############CMD##############

```bash
## install globally typescript ##
npm install -g typescript
## gives elevated privileges to run commands ##
sudo
## create a project ##
npm init -y
## add typescript as a dev dependency ##
npm install typescript --save-dev
## create typescript configuration file ##
npx tsc --init
## compile typescript ##
tsc
## run page of code ##
node filename
## run "scripts" command from package.json ("test": "tsc && node test.js")##
npm run dev
## create typescript project with vite##
npm init vite@latest projectName -- --template vanilla-ts
```

############PROJECT##############
When building the dist folder (distribution) contains all the ts code converted to js

strict means the code cannot compile unless very strict conditions are met (package.json)

modules are files of code to import or export that code

a relative import is import with a relative path ./
an absolute import uses the full path, no ./

namespaces allow you organize code into different blocks within an individual file to be exported like modules

types.ts contains all the different type definition, if that file becomes too big,
you separate the types into multiple files based on where they're going to be used
src/component/types.ts
src/api/types.ts
src/types.ts for shared types
