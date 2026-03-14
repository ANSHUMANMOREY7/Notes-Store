import { memo } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Path = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900">

      <Navbar />

      <div>
        Path Page
      </div>

    </div>
  );
};

export default memo(Path);