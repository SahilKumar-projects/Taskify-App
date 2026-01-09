const WelcomeCard = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center absolute left-24 top-1/2 -translate-y-1/2">
      
      <div className="animate-float bg-white/40 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-8 max-w-sm text-center">
        
        <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
          T
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Welcome to Taskify 
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Organize tasks, track progress, and boost productivity — all in one place.
        </p>

        <div className="text-xs text-gray-500">
          Let’s get started...
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
