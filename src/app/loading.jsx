const Loading = () => {
  return (
    <div className="min-h-screen bg-[#08090b] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-5 flex justify-center">
          <span className="loading loading-spinner loading-xl text-lime-400"></span>
        </div>

        <h2 className="text-xl font-bold text-white">
          FITLOG
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Preparing your workout...
        </p>
      </div>
    </div>
  );
};

export default Loading;