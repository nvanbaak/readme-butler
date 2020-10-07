// Import statements
var inq = require("inquirer");

// Inquirer call to get information
inq.prompt([
    {
        message:"What is the name of the project?",
        type:"input",
        name:"projName"
    } , {
        message:"What problem does it target?",
        type:"input",
        name:"projProb"
    } , {
        message:"What does it do?",
        type:"input",
        name:"projDesc"
    } , {
        message:"What steps does the user need to take to install the project? (leave blank if none)",
        name:"install"
    } , {
        message:"What's the program workflow?",
        name:"workflow"
    } , {
        
    }
])