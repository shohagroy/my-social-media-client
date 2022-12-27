import React from "react";
import loader from "../../Assets/loading.gif";

const LoadingLoader = () => {
  return (
    <div
      className={`w-screen h-screen   bg-white/70 top-0 z-50 flex justify-center items-center"
        }`}
    >
      <img className="1/4" src={loader} alt="loading" />
    </div>
  );
};

export default LoadingLoader;
