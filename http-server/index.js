const http = require("http");
const fs = require("fs");
const minimist = require('minimist');

// taking aruguement from command line for port number using minimist
const args = minimist(process.argv.slice(2));
const port = parseInt(args.port);

let homeContent = "";
let projectContent = "";

// reading home.html page and storing in avariable
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

// reading project.html page and storing in a variable
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

// reading registration.html page and storing in a variable
fs.readFile("registration.html",(err, registration) =>{
    if (err){
        throw err;
    }
  registrationContent = registration;
})

// creation of http functional server
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      // writing project page to browser
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      // writing registration page to browser
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      // defaulted to home page
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port); // making the server to listen to the port number which was given by command line