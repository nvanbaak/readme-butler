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

        // What's a nother?  Stay tuned!
        let nother = "";

        while (keepLooping) {

            console.log(`\n******\n`);

            // We start by asking if the user would like to add a feature
            let { addFeature }= await inq.prompt({
                    name:"addFeature",
                    message:`Would you like to add a${nother} feature?`,
                    type:"list",
                    choices:["yes","no"]
            });

            // Put the "nother" in "another"
            nother = "nother";

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
    finishReadme(partialReadme);

    } catch (err) {
        throw err;
    }
}

// Gets the information to complete the Credits 
async function finishReadme(partialReadme) {
    try {

        let accomplices = [];
        let teamLoop = true;

        // First we cycle through teammates until done
        while (teamLoop) {

            let { teammate } = await inq.prompt({
                name:"teammate",
                message:"Enter the Github page of a teammate or leave blank to skip"
            })

            // If they gave us a link, we push it
            if (teammate) {
                accomplices.push(teammate);

            } else {
                // else we're done
                teamLoop = false;
            }
        }

        // Next we ask for any third party assets 
        let assetLoop = true;

        while (assetLoop) {

            let { thirdParty } = await inq.prompt({
                name:"thirdParty",
                message:"Do you want to credit any third party assets?",
                type:"list",
                choices:["yes","no"]
            })

            if (thirdParty === "yes") {
                // Ask for more information

                console.log("Sorry, you'll have to add that manually for now");
            } else {
                // Shut down the loop
                assetLoop = false;
            }
        }

        // Choose license
        let { license } = await inq.prompt({
            name:"license",
            message:"Choose a license for this project",
            type:"list",
            choices:["MIT","GNU"]
        });

        // Make a markdown string using the information
        let readmeBottom = textGen.generateReadmeBottom(accomplices, license);

        // Add to in progress readme
        partialReadme += readmeBottom;

        // And we're done!  Write our masterpiece to a file
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