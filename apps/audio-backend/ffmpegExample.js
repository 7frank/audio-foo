const example = (req, res) => {
  const inputFile = req.file.path;
  const outputFormat = "webm";

  const soundfontFilePath = path.resolve("soundfonts/wt_183k_G.sf2");

  const soundfontFilter = `soundfont=${soundfontFilePath}`;

  // Create an FFmpeg process to convert the file
  const ffmpegProcess = ffmpeg(inputFile)
    // .audioFilters(soundfontFilter)
    .audioFilters("lowpass=f=500")
    .format(outputFormat)
    .audioCodec("libvorbis")
    .outputOptions(["-f webm", "-vn"])
    .pipe(res, { end: true });

  // Handle errors
  ffmpegProcess.on("error", (err) => {
    console.error("FFmpeg error:", err);
    res.status(500).send("An error occurred during conversion.");
  });
};
