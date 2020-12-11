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