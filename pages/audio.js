import Video from '../components/Video';
import AudioMaker from '../components/AudioMaker';

const audio = () => {
  return (
    <div className="h-full max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <Video />
      <AudioMaker />
    </div>
  );
};

export default audio;
