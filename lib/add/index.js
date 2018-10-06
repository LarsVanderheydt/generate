const fs = require('fs');
const inquirer = require('inquirer');

const q = [
  {
    name: 'name',
    type: 'input',
    message: 'How would you like to name this repo?'
  },
  {
    name: 'value',
    type: 'input',
    message: 'The repo link for this boilerplate',
    validate: function (input) {
      if (input.endsWith(".git")) return true;
      else return "This is not a .git repo"
    }
  }
]

inquirer.prompt(q).then(({name, value}) => {
  fs.readFile('./lib/projectlist.json', 'utf8', (err, file) => {
    if (err) throw err;
    const data = JSON.parse(file);

    data.push({ name, value })

    fs.writeFile('./lib/projectlist.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  })
})
