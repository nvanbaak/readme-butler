const fs = require("fs");

function generateReadmeTop(name, description, install) {

    // First generate install section

    let installStr;
    
    // Check for install default
    if(!install) {
        // If the user didn't enter special instructions we use the default
        installStr = `${name} can be installed by entering the following command in the app's directory:
\`\`\`
npm install
\`\`\`

This should install the necessary npm packages and allow the app to run.`;
    } else {
        // If the user entered specific instructions we use those instead
        installStr = install;
    }


    // Build readme page
    outputStr = `# ${name}

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Description

${description}

## Installation

${installStr}

## Usage\n\n`
    

    // Return completed readme
    return outputStr;
}

module.exports = {
    generateReadmeTop
}