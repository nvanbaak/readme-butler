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
    } , {
        message:"What's the workflow for the app?",
        type:"input",
        name:"workflow"
    }
]).then((response) => {

    // Combine the strings that make up the description
    let descStr = response.projProb + "  " + response.projDesc;

    // Generate the first part of the readme
    outputStr = textGen.generateReadmeTop(response.projName, descStr, response.install, response.workflow);

    // Start the usage section
    addFeature(outputStr);

});

// Given a readme that has been written up to the usage section, this function recursively fires until the user signals they're done
function addFeature(partialReadme) {
    // We start by asking if the user would like to add a feature
    inq.prompt([
        {
            name:"addFeature",
            message:"Would you like to add a feature?",
            type:"list",
            choices:["yes","no"]
        }
    ]).then(answers=> {
        if (answers.addFeature === "yes") {
            // another inquirer prompt

            console.log("added a feature!");

            inq.prompt([{
                name:"header",
                message:"What's the feature?",
                type:"input"
            } , {
                name:"featureDesc",
                message:"Describe the feature in more detail",
                type:"input"
            } , {
                name:"screenshot",
                message:"Enter the filename of a relevant screenshot (Readme Generator will look for that file in the Assets folder).  Leave blank to skip screenshot."
            }]).then(response=>{

                // Then we run the function again in case they want to add more features
                addFeature(partialReadme);
            })


        } else {
            // move on to next section
            writeReadme(partialReadme);
        }
    });
}





// This function takes a string and writes it readme.md
function writeReadme(outputStr) {

    // Output function
    fs.writeFile("./readme.md",outputStr,"utf8",function(err) {
        if (err) throw err;
    });
    
    // Log to let the user know the process is complete
    console.log("\nReadme complete!");
}