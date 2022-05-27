const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    readWrite('index.html', 'text/html');
  }
  else if (page == '/otherpage') {
    readWrite('otherpage.html', 'text/html');
  } 
  else if (page == '/otherotherpage') {
    readWrite('otherotherpage.html', 'text/html');
  }
  else if (page == '/api') {
      let personName = 'unknown'
      let personOccupation = 'unknown'
      let personStatus = 'unknown'
      if(params['student']== 'leon'){
        personName = 'leon'
        personOccupation = 'Boss Man'
        personStatus = 'Baller'
      }
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: personName,
          currentOccupation: personOccupation,
          status: personStatus
        }
        res.end(JSON.stringify(objToJson));
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    readWrite('js/main.js','text/javascript');
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
