const inquirer = require('inquirer');
const simpleGit = require('simple-git')();
const projects = require('../projectlist.json');

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
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(q).then(({choice, name}) => {
  simpleGit.mirror(choice, name);
});
