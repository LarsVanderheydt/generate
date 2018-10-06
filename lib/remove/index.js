const inquirer = require('inquirer');
const fs = require('fs');
const projects = require('../projectlist.json');

const q = [
  {
    name: 'value',
    type: 'list',
    message: 'What project would you like to remove?',
    choices: projects
  }
];

inquirer.prompt(q).then(({value}) => {
  fs.readFile('./lib/projectlist.json', 'utf8', (err, file) => {
    if (err) throw err;
    const data = JSON.parse(file);
    let index = null;

    data.forEach((d, i) => value === d.value ? index = i : null);
    data.splice(index, 1);

    fs.writeFile('./lib/projectlist.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  })
})
