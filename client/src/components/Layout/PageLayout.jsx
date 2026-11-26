import Navbar from "../Navbar/Navbar";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">

      <Navbar />

      <div className="portal-options relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5 pt-24 pb-12 gap-8">

        {children}

      </div>

    </div>
  );
};

export default PageLayout;