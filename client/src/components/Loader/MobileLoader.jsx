const MobileLoader = ({ title, description, icon: Icon }) => {
  return (
    <div
      role="status"
      className="fixed inset-0 z-20 md:hidden bg-transparent text-white flex flex-col items-center justify-center gap-5 px-6 pointer-events-none"
    >
      {/* Animated Ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">

        {/* Background Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/20" />

        {/* Rotating Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500 animate-spin" />

        {/* Dynamic Icon */}
        <Icon className="w-9 h-9 text-purple-400" />

      </div>

      <h2 className="font-[font1] text-2xl font-bold tracking-wide text-center">
        {title}
      </h2>

      <p className="text-gray-400 text-sm text-center">
        {description}
      </p>
    </div>
  );
};

export default MobileLoader;