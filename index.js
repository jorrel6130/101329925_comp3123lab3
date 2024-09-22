// Jorrel Tigbayan
// ID: 101329925

var http = require("http");
//TODO - Use Employee Module here
var employees = require('./Employee.js');
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end('<h1>Welcome to Lab Exercise 03</h1>');
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            console.log(employees);
            let employeesAsc = employees.slice().sort((a, b) => b.id - a.id);
            console.log(employeesAsc);
            let names = employeesAsc.map(employee => { return {firstName: employee.firstName, lastName: employee.lastName}; })
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(names));
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 } 
            salary_sum = { total_salary: employees.map(employee => employee.Salary).reduce((accumulate, amount) => accumulate + amount) };
            console.log(salary_sum);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(salary_sum));
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})