// Import statements
const inq = require("inquirer");
const fs = require("fs");

let outputStr = "test";

// Inquirer call to get information
// inq.prompt([
//     {
//         message:"What is the name of the project?",
//         type:"input",
//         name:"projName"
//     } , {
//         message:"What problem does it target?",
//         type:"input",
//         name:"projProb"
//     } , {
//         message:"What does it do?",
//         type:"input",
//         name:"projDesc"
//     } , {
//         message:"What steps does the user need to take to install the project? (leave blank if none)",
//         name:"install"
//     } , {
//         message:"What's the program workflow?",
//         name:"workflow"
//     }
// ]).then((response) => {

// });

fs.writeFile("./readme.md",outputStr,"utf8",function(err) {
    if(err) {
        throw err;
    }
});
