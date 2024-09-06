/* const fs = require('fs');

fs.readFile('index.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const obj = JSON.parse(data);
    console.log(obj);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});

const fs = require('fs');

fs.readFile('index.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const obj = JSON.parse(data);
    // Convert the object to a JSON-formatted string for logging
    console.log(JSON.stringify(obj, null, 2));
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
}); */

/* function showList() {
  fetch('index.json')
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
    return createList(data);
}) 

.then(function (obj) {
      console.log(obj);
    })
    .catch(function (error) {
      console.error('Something went wrong with retreiving the json');
      console.error(error);
    });
}

function createList(data) {
  const mainUL = document.createElement('ul')
  for (let i = 0; i < data.result.length; i++) {
    const studentLI = document.createElement('li');
    studentLI.innerHTML = data.result[i].name;
  }

  for (let i = 0; i < data.result.length; i++) {
    const studentLI = document.createElement('li');
    studentLI.innerHTML = data.result[i].name;

    // create list for marks
    const marksUL = document.createElement('ul');
    for (var key in data.result[i].marks) {
      const marksLI = document.createElement('li');
      marksLI.innerHTML = key + ': ' + data.result[i].marks[key];
      marksUL.appendChild(marksLI);
    }

    // append marks list to studentLI
    studentLI.appendChild(marksUL);
  }

  // append studentLI to mainUL
  mainUL.appendChild(studentLI);
} */

function showList(){
  fetch("index.json")
    .then(response => response.json())
    .then(data => createList(data));
}

function createList(data) {
  const mainUL = document.createElement('ol');
  for (let i = 0; i < data.result.length; i++) {
    const studentLI = document.createElement('li');
    studentLI.innerHTML = data.result[i].name;

    // create list for marks
    const marksUL = document.createElement('ul');
    for (var key in data.result[i].marks) {
      const marksLI = document.createElement('li');
      marksLI.innerHTML = key + ': ' + data.result[i].marks[key];
      marksUL.appendChild(marksLI);
    }

    // append marks list to studentLI
    studentLI.appendChild(marksUL);
    // append student list to mainUL
    mainUL.appendChild(studentLI);
  }
  // append mainUL to body
  document.body.appendChild(mainUL);
}