import React from "react";

function SupportToken() {
  return (
    <div
      className="flex items-center justify-center w-full h-full my-20"
    >
      <div
        className="relative z-10 w-full h-20 md:w-3/4 lg:w-2/5 rounded-2xl "
      >
        <div className="w-full h-full  backdrop-blur-lg rounded-2xl z-[1] p-6 flex items-center justify-center   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center space-x-2">
            <h3 className="lg:text-[32px] font-extrabold text-2xl md:text-3xl ">
              Supported Tokens
            </h3>
          </div>
        </div>
        <div
          className={`w-16 h-20 rotate-45  bg-[#C5FF4B]  z-0 absolute -left-2  -bottom-10`}
        ></div>
        <div
          className={`w-16 h-20 rotate-45 scale-90  bg-[#C5FF4B] blur-md z-0 absolute -right-6  -top-10`}
        ></div>
      </div>
    </div>
  );
}

export default SupportToken;
