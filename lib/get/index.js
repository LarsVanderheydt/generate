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
    validate: input => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(q).then(({choice, name}) => {
  const clone = exec(`git clone ${choice} ${name}`, err => {
    if (err) throw err;
  });

  clone.on('exit', _ => exec('sudo rm -R .git'));
});
