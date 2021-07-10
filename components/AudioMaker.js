import { useContext, useEffect, useState } from 'react';
import GifContext from '../context/video/VideoContext';
import { loadFFmpeg, ffmpeg, extractAudio } from '../components/helper';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';

const AudioMaker = () => {
  const gifContext = useContext(GifContext);
  const { video, loading, setLoading, percentageCompletion, setMediaPresent } =
    gifContext;

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setLoading(true);
    loadFFmpeg();
    setLoading(false);
  }, []);

  ffmpeg.setProgress(({ ratio }) => {
    if (ratio < 0.1) {
      setPercentageCompletion(Math.floor(ratio * 1000));
    }
  });

  const runExtractor = async () => {
    setLoading(true);
    const audioUrl = await extractAudio(video);
    setLoading(false);
    setAudio(audioUrl);
    setMediaPresent(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <svg
          className="animate-spin -ml-1 mr-3 h-24 w-24 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h1 className="mx-auto font-semibold text-3xl">
          {percentageCompletion} %
        </h1>
      </div>
    );
  }

  if (audio) {
    return (
      <audio controls src={audio} type="audio/ogg">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    );
  }

  return (
    <>
      {video && (
        <button
          type="button"
          onClick={runExtractor}
          className="flex-initial inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create GIF
          <ArrowCircleRightIcon
            className="ml-2 -mr-0.5 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
};

export default AudioMaker;
