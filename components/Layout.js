import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
