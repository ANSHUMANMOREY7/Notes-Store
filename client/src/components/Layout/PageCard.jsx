const PageCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-black/70 text-white p-10
      rounded-2xl flex flex-col items-center
      text-center gap-4 shadow-xl
      hover:scale-105 transition duration-300
      ${className}`}
    >
      {children}
    </div>
  );
};

export default PageCard;