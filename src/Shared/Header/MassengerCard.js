import React from "react";

const MassengerCard = () => {
  return (
    <div className=" z-50 p-4 border-2 rounded-xl border-gray-500 h-full w-full">
      <h2 className="text-xl p-3 bg-gray-100 mb-1 rounded-t-xl font-semibold text-center">
        All Message
      </h2>
      <hr className="border-t-2 border-black" />
      <div className="h-full mt- bg-gray-50">
        <div className="">
          <div className=" duration-300 p-2 cursor-pointer hover:bg-gray-100 h-[10vh]">
            <div>
              <div>shdfhdsfkjdsakfk</div>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <div className=" duration-300 p-2 cursor-pointer hover:bg-gray-100 bg-gray-50 h-[10vh]">
            <div>
              <div>shdfhdsfkjdsakfk</div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default MassengerCard;
