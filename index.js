// Import statements
const inq = require("inquirer");
const fs = require("fs");
const textGen = require("./textGen.js")

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
]).then((response) => {

    // Combine the strings that make up the description
    let descStr = response.projProb + "  " + response.projDesc;

    // Generate the first part of the readme
    outputStr = textGen.generateReadmeTop(response.projName, descStr, response.install);

    // Start the usage section

    // Output
    writeReadme(outputStr);

});


// This function takes a string and writes it readme.md
function writeReadme(outputStr) {

    // Output function
    fs.writeFile("./readme.md",outputStr,"utf8",function(err) {
        if (err) throw err;
    });
    
    // Log to let the user know the process is complete
    console.log("\nReadme complete!");
}