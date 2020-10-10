const fs = require("fs");

function generateReadme(name, description, install) {

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
    
    ${install}\n\n`
    
}

module.exports = generateReadme();