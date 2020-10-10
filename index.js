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

// Given a readme that has been written up to the usage section, this function fires until the user signals they're done
async function addFeature(partialReadme) {
    try {

        // We keep looping until the user tells us they're done in the else block
        let keepLooping = true;

        while (keepLooping) {

            // We start by asking if the user would like to add a feature
            let { addFeature }= await inq.prompt({
                    name:"addFeature",
                    message:"Would you like to add a feature?",
                    type:"list",
                    choices:["yes","no"]
            });

            // If yes, we run another inquirer prompt to get the details
            if (addFeature === "yes") {

                // This block makes an inquirer call and destructures the response
                let {header, featureDesc, screenshot} = await inq.prompt([{
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
                }]);

                // If the user has a screenshot, we ask for an alt
                let imgAlt;

                if (screenshot) {
                    imgAlt = await inq.prompt({
                        name:"imgAlt",
                        message:"Give your screenshot an alt text"
                    });
                } // end of alt acquisition

                // Make a new section
                let newSection = textGen.generateUsage(header, featureDesc, screenshot, imgAlt);

                // Add it to the existing readme
                partialReadme = partialReadme + newSection;

            // If the user said they didn't want to add a new feature...
            } else {

                // Stop the loop
                keepLooping = false;

            }
        }

    // Once we're out of the loop, we move on
    writeReadme(partialReadme);

    } catch (err) {
        throw err;
    }
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