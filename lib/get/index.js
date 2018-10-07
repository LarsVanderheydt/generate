const inquirer = require('inquirer');
const projects = require('../projectlist.json');
const exec = require('child_process').exec;

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
  exec(`git clone ${choice} ${name}`, function(err, stdout, stderr) {
    if (err) throw err;
  });
});
