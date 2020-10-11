function generateReadmeTop(username, repoName, name, description, install, workflow) {

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

![repo-size-badge](https://img.shields.io/github/repo-size/${username}/${repoName})
![license-badge](https://img.shields.io/github/license/${username}/${repoName})

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
function generateUsage(username, header, description, screenshot, alt) {

    let screenshotStr;

    // Figure out if there's a screenshot
    if (screenshot) {
        screenshotStr = `![${alt}](./Assets/${screenshot})\n\n`;
    } else {
        screenshotStr = "";
    }

    // Once the screenshot's good to go, we generate the template
    let newSection = `### ${header}

${description}

${screenshotStr}`

    return newSection;
}

// This function generates the Credits and License sections of the readme
function generateReadmeBottom(username, githubArray, license) {

    let contributorStr;

    // If there's more than one contributor, we make contributors a subsection.  Otherwise we just use the user's github.
    if (githubArray.length > 0) {
        contributorStr = `### Contributors

* Created by https://github.com/${username}/
* Co-contributors:\n`;

        // Loop through contributors
        for (let i = 0; i < githubArray.length; i++) {
            contributorStr += 
`   * https://github.com/${githubArray[i]}/\n`;
        }

        // When all contributors have been added we add the line break
        contributorStr += `\n\n`;
    } else {
        contributorStr = `* Created by https://github.com/${username}/\n\n`;
    }


    // Get the current year for copyright
    let thisYear = new Date()

    // Add to template
    let outputStr = `## Credits

${contributorStr}

## License

This project uses the ${license} license.

------
© ${thisYear.getFullYear()} ${username}`

    // Return completed template
    return outputStr;
}


module.exports = {
    generateReadmeTop,
    generateUsage,
    generateReadmeBottom,
}