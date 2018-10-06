#!/usr/bin/env node

require('inquirer').prompt(require('./lib/crud.json')).then(({why}) => {
  require(`./lib/${why}/index.js`);
});
