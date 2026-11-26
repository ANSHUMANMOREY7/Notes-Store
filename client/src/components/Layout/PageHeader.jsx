const PageHeader = ({ title, description }) => {
  return (
    <div className="text-center mb-4 md:mb-8 px-4">

      <h1 className="text-white font-[font1] font-bold text-3xl sm:text-4xl md:text-4xl leading-tight">
        {title}
      </h1>

      <p className="text-gray-300 font-normal font-sans mt-2 text-sm sm:text-base md:text-lg">
        {description}
      </p>

    </div>
  );
};

export default PageHeader;