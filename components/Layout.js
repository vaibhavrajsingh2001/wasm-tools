import Navbar from './Navbar';
import VideoState from '../context/video/VideoState';

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <VideoState>
        <div className="flex-grow svg-background text-white">{children}</div>
      </VideoState>
    </div>
  );
};

export default Layout;
