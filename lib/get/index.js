const inquirer = require('inquirer');
const projects = require('../projectlist.json');
const exec = require('child_process').exec;
const process = require('process');

const q = [
  {
    name: 'choice',
    type: 'list',
    message: 'What project would you like to generate?',
    choices: projects
  },

  {
    name: 'name',
    type: 'input',
    message: 'Project name:',
    validate: input => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(q).then(({choice, name}) => {
  exec(`git clone ${choice} ${name}`).on('exit', _ => {
    // Remove .git folder inside project
    exec(`sudo rm -R ./${name}/.git`)
  })
});

// Can't cd into project with nodejs