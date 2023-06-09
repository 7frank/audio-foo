const { spawn } = require("child_process");

function cutMp3ToLength(inputFile, outputFile, length = 5) {
  const args = [
    "-y",
    "-i",
    inputFile,
    "-ss",
    "0",
    "-t",
    length.toString(),
    "-c:a",
    "pcm_s16le",
    "-ar",
    "44100",
    "-ac",
    "2",
    "-f",
    "wav",
    outputFile,
  ];

  const sMessage = `MP3 cut successfully to ${length} seconds.`;

  console.log("task cmd: ffmpeg " + args.join(" "));

  return new Promise((resolve, reject) => {
    // Run ffmpeg command
    const ffmpeg = spawn("ffmpeg", args);

    // Handle errors and completion
    ffmpeg.on("error", (error) => {
      reject(`Error executing ffmpeg: ${error}`);
    });

    ffmpeg.on("exit", (code, signal) => {
      if (code === 0) {
        console.log(sMessage);
        resolve(sMessage);
      } else {
        reject(`FFmpeg process exited with code ${code} and signal ${signal}`);
      }
    });
  });
}

function replaceCwdWithPath(cwd, fileName, newPath) {
  const path = require("path");
  const filePath = path.resolve(cwd, fileName);
  const relativePath = path.relative(cwd, filePath);
  const newFilePath = path.join(newPath, relativePath);
  return newFilePath;
}

function extractS(inputFilename, cb) {
  const command = "docker";
  const pwd = process.cwd();
  const args = [
    "run",
    "-v",
    `${pwd}/.cache:/root/.cache`,
    "-v",
    `${pwd}:/data`,

    "faroit/open-unmix-pytorch",
    replaceCwdWithPath(pwd, inputFilename, "/data"),
    "--outdir",
    "/data/uploads",
  ];

  console.log("task cmd: " + command + " " + args.join(" "));

  // Spawn a child process for the command
  const childProcess = spawn(command, args, { stdio: "inherit" });

  // Event handlers for stdout and stderr
  //   childProcess.stdout.on("data", (data) => {
  //     console.log(data.toString());
  //   });

  //   childProcess.stderr.on("data", (data) => {
  //     console.error(data.toString());
  //   });

  // Handler for when the child process finishes
  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    // Add your post-processing logic here
    cb();
  });
}

module.exports = { cutMp3ToLength, extractS };
