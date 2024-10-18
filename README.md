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
