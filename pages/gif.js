import VideoState from '../context/video/VideoState';
import Video from '../components/Video';
import GifMaker from '../components/GifMaker';

const gif = () => {
  return (
    <VideoState>
      <div className="h-full max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Video />
        <GifMaker />
      </div>
    </VideoState>
  );
};

export default gif;
