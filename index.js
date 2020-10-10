// Import statements
const inq = require("inquirer");
const fs = require("fs");

let outputStr = ``;

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
        message:"What steps does the user need to take to install the project? (leave blank if just 'npm install')",
        name:"install"
    } 
    //, {
    //     message:"What's the program workflow?",
    //     name:"workflow"
    // }
]).then((response) => {

    let installStr;

    // Check for install default
    if(!response.install) {
        // If the user didn't enter special instructions we use the default
        installStr = `${response.name} can be installed by entering the following command in the app's directory:
\`\`\`
npm install
\`\`\`

This should install the necessary npm packages and allow the app to run.`;
    } else {
        // If the user entered specific instructions we use those instead
        installStr = response.install;
    }


    // Build readme page
    outputStr = `# ${response.projName}

## Table of Contents
* [Description](#description)
* [Installation](#installation)

## Description

${response.projProb}  ${response.projDesc}

## Installation

${installStr}`


    // Then output to readme file
    fs.writeFile("./readme.md",outputStr,"utf8",function(err) {
        if (err) throw err;
    });

    console.log("\nReadme complete!");
});

