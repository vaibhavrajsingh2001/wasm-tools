import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export const ffmpeg = createFFmpeg({
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  log: true,
});

export const loadFFmpeg = async () => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
};

export const convertToGif = async (gifStart, gifEnd, video) => {
  const gifDuration = gifEnd - gifStart;
  // FFmpeg manages its own file system, so load file into it & name it something
  ffmpeg.FS('writeFile', 'temp.mp4', await fetchFile(video));

  /*
  Run FFmpeg command (works similar to CLI, pass values to flag)
   -i : input file
   -t : duration of output file
   -ss : offset, at which point of input file it'll start
   -f : output format & name
  */
  await ffmpeg.run(
    '-i',
    'temp.mp4',
    '-t',
    `${gifDuration}`,
    '-ss',
    `${gifStart}`,
    '-f',
    'gif',
    'output.gif'
  );

  // Read the output file from FFmpeg file system
  const gifData = ffmpeg.FS('readFile', 'output.gif');

  // Make a URL from the file to show on frontend (by making a blob from the file and giving a MIME type)
  const gifURL = URL.createObjectURL(
    new Blob([gifData.buffer], { type: 'image/gif' })
  );

  return gifURL;
};
