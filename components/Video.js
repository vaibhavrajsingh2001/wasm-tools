import { useContext } from 'react';
import GifContext from '../context/gif/gifContext';

const Video = () => {
  const gifContext = useContext(GifContext);
  const { video, setVideo, setVideoDuration, gif, loading } = gifContext;

  const handleVideoInput = (e) => {
    e.preventDefault();
    setVideo(e.target.files?.item(0));
  };

  const handleLoadedMetaData = (e) => {
    e.preventDefault();

    setVideoDuration(Math.floor(e.target.duration));
  };

  const handleRemoveVideo = (e) => {
    e.preventDefault();
    setVideo(null);
  };

  if (gif || loading) {
    return (null);
  }

  return (
    <>
      {!video && (
        <>
          <label className="w-64 flex flex-col items-center my-auto px-4 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-200 cursor-pointer hover:bg-blue-300 hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">
              Upload A Video
            </span>
            <input
              type="file"
              className="hidden"
              name="video_input"
              onChange={handleVideoInput}
            />
          </label>
        </>
      )}

      {video && (
        <div className="flex flex-col items-center mt-8">
          <span className="mb-2 inline-flex rounded-full items-center py-1 pl-2.5 pr-1 text-sm font-medium bg-blue-100 text-blue-700">
            {video.name}
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
            >
              <span className="sr-only">Remove uploaded video</span>
              <svg
                className="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
          <video
            controls
            className="w-4/5 lg:w-1/2"
            onLoadedMetadata={handleLoadedMetaData}
          >
            <source src={URL.createObjectURL(video)} />
          </video>
        </div>
      )}
    </>
  );
};

export default Video;
