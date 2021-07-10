/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import {
  TrashIcon,
  ArrowCircleRightIcon,
  ArrowCircleDownIcon,
} from '@heroicons/react/solid';
import VideoContext from '../context/video/VideoContext';
import { loadFFmpeg, ffmpeg, convertToGif } from '../components/helper';

const GifMaker = () => {
  const videoContext = useContext(VideoContext);
  const {
    video,
    videoDuration,
    setMediaPresent,
    percentageCompletion,
    setPercentageCompletion,
    loading,
    setLoading,
  } = videoContext;

  const [gif, setGif] = useState(null);

  const [values, setValues] = useState([0, videoDuration]);
  const STEP = 1;
  const MIN = 0;
  const MAX = videoDuration;

  const setDefaultRange = (start, end) => {
    setValues([start, end]);
  };

  const runConverter = async () => {
    setLoading(true);
    const gifUrl = await convertToGif(values[0], values[1], video);
    setLoading(false);
    setGif(gifUrl);
    setMediaPresent(true);
  };

  useEffect(() => {
    const start = parseFloat((videoDuration / 4).toFixed(1));
    const end = parseFloat((3 * (videoDuration / 4)).toFixed(1));
    setDefaultRange(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoDuration]);

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

  if (gif) {
    return (
      <div className="flex flex-col px-2">
        <p className="mx-auto mb-4">
          <a
            type="button"
            download="result"
            href={gif}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Download GIF
            <ArrowCircleDownIcon
              className="ml-2 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </a>
        </p>
        <img src={gif} className="md:max-w-3xl lg:max-w-5xl" alt="Result GIF" />
      </div>
    );
  } else {
    return (
      <>
        {video && videoDuration && !gif && (
          <div className="my-4 w-4/5 lg:w-1/2 flex flex-col">
            <p className="my-4 font-extrabold lg:text-2xl">
              Chose GIF Duration
            </p>
            <div>
              <Range
                draggableTrack
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                  setValues(values);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values,
                          colors: ['#ccc', 'rgba(147, 197, 253)', '#ccc'],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: 'center',
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    className="h-6 w-8 rounded-md bg-white flex justify-center items-center"
                    style={{
                      ...props.style,
                      boxShadow: '0px 2px 6px #AAA',
                    }}
                  >
                    <div
                      style={{
                        height: '16px',
                        width: '5px',
                        backgroundColor: isDragged
                          ? 'rgba(147, 197, 253)'
                          : '#CCC',
                      }}
                    />
                  </div>
                )}
              />
            </div>
            <div className="my-4 w-full lg:text-lg flex justify-between">
              <span className="">From: {values[0].toFixed(1)} s</span>
              <span className="">To: {values[1].toFixed(1)} s</span>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setDefaultRange(0, videoDuration)}
                className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Clear Range
                <TrashIcon
                  className="ml-2 -mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={runConverter}
                className="flex-initial inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create GIF
                <ArrowCircleRightIcon
                  className="ml-2 -mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default GifMaker;
