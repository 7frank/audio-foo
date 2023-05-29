var Queue = require("better-queue");
var { cutMp3ToLength, extractS } = require("./cutMp3ToLength");

var q = new Queue(function (input, cb) {
  console.log("next task", input);

  // Some processing here ...
  try {
    const totalBytes = 1;
    for (let bytesUploaded = 0; bytesUploaded < totalBytes; bytesUploaded++) {
      this.progressBatch(bytesUploaded, totalBytes, "uploading");
    }
  } catch (err) {
    cb("progressBatch:" + err.message, null);
  }

  // Usage example

  const inputFile = input.filepath;
  const tempOutputWavFileName = inputFile.replace(".mp3", "") + ".wav";

  cutMp3ToLength(inputFile, tempOutputWavFileName).then(() => {
    console.log("cutMp3ToLength done");
    extractS(tempOutputWavFileName, () => {
      cb(null, "done");
    });
  });
});

function addQueueEventListeners(io) {
  q.on("task_finish", function (taskId, result, stats) {
    //console.log("task_finish", taskId, result, stats); // taskId = 1, result: 3, stats = { elapsed: <time taken> }
    io.emit("progress", { type: "task_finish", taskId, result, stats });
  });
  q.on("task_failed", function (taskId, err, stats) {
    // Handle error, stats = { elapsed: <time taken> }
    //console.log("task_failed", taskId, err, stats); // taskId = 1, result: 3, stats = { elapsed: <time taken> }
    io.emit("progress", { type: "task_failed", taskId, err, stats });
  });

  q.on("task_progress", function (taskId, completed, total) {
    io.emit("progress", { type: "task_progress", taskId, completed, total });
  });

  q.on("empty", function (...args) {
    io.emit("progress", { type: "empty", args });
  });

  //   q.on("drain", function (...args) {
  //     io.emit("progress", { type: "drain", args });
  //   });
}

module.exports = { q, addQueueEventListeners };
