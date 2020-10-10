const fs = require("fs");

function generateReadmeTop(name, description, install, workflow) {

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

![dependency-badge](https://img.shields.io/requires/github/nvanbaak/readme-generator)
![repo-size-badge](https://img.shields.io/github/repo-size/nvanbaak/readme-generator)
![license-badge](https://img.shields.io/github/license/nvanbaak/readme-generator)

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

## Usage

${workflow}\n\n`
    

    // Return completed readme
    return outputStr;
}

// This function constructs a markdown string for one subsection of the usage section
function generateUsage(header, description, screenshot, alt) {

    let screenshotStr;

    // Figure out if there's a screenshot
    if (screenshot) {
        screenshotStr = `[${alt}]()./Assets/${screenshot})\n\n`;
    } else {
        screenshotStr = "";
    }

    // Once the screenshot's good to go, we generate the template
    let newSection = `### ${header}

${description}

${screenshotStr}`

    return newSection;
}


function generateReadmeBottom(githubArray, license) {

}


module.exports = {
    generateReadmeTop,
    generateUsage,
    generateReadmeBottom,
}