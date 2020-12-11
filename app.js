const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { response } = require("express");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//NOTE: employee information questions
const promptQuestions = [
    {
        type: "list",
        message: "What is your job title?:",
        name: "jobInput",
        choices: ["Intern", "Engineer", "Manager"],
    },
    {
        type: "input",
        message: "Enter your fullname:",
        name: "nameInput",
    },
    {
        type: "input",
        message: "Enter your email address:",
        name: "emailInput",
    },
    {
        type: "input",
        message: "What is your Employee ID?:",
        name: "idInput",
    },
]

function numOfMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Need to add another member?",
            name: "membersInput",
            choices: ["Yes", "No"]
        }
    ]).then((res) => {
        if (res.membersInput === "Yes") {
            console.log("add another member")
            employeeInfo()
        } else {
            output()
            return
        }
    })
    
}

let teamMembers = []

async function employeeInfo() {
    await inquirer.prompt(promptQuestions) 
    .then((response) => {
        employeeName = response.nameInput;
        employeeID = response.idInput;
        employeeEmail = response.emailInput;
        employeeJobTitle = response.jobInput


        // NOTE: Different job title will be given an addition question.
        if (employeeJobTitle === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What school did you attend or currently attending?:",
                    name: "schoolInput",
                }
            ]).then((response) => {
                const intern = new Intern(employeeName, employeeID, employeeEmail, response.schoolInput)
                console.log(intern)
                teamMembers.push(intern)

                numOfMembers()
                output()
            })
        } else if (employeeJobTitle === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your gitHub profile?:",
                    name: "gitHubInput",
                }
            ]).then((response) => {
                const engineer = new Engineer(employeeName, employeeID, employeeEmail, response.gitHubInput)
                console.log(engineer)
                teamMembers.push(engineer)

                numOfMembers()
                output()
            })
        } else if (employeeJobTitle === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your office number?:",
                    name: "officeNumInput",
                }
            ]).then((response) => {
                const manager = new Manager(employeeName, employeeID, employeeEmail, response.officeNumInput)
                console.log(manager)
                teamMembers.push(manager)

                numOfMembers()
                output()
            })
        }
    })
}

employeeInfo()

function output() {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
    if (err) {
    return console.log(err);
    }
    console.log("\n Created a Dream Team");
    })
}