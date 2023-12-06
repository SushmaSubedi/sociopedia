const { exec } = require("child_process");

// Define the command to install Python dependencies
const command = "pip install -r requirements.txt";

// Run the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing Python dependencies: ${error}`);
  } else {
    console.log(`Python dependencies installed successfully.`);
  }
});
