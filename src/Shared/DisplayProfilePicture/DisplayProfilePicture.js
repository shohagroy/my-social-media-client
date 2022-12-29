import React from "react";

const DisplayProfilePicture = () => {
  return (
    <section className="">
      <div className=" h-[650px]">
        <div className="w-full relative">
          <img
            src="https://scontent.fdac33-1.fna.fbcdn.net/v/t39.30808-6/240465437_961170884444931_7763426641944713602_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeFJ1EjQHTLh64nHMk5jbSsCxojfiCvtmtbGiN-IK-2a1l7YGfVvs2uyq4HBw1y6txV7jShmfi5ycL5aaxzwuutY&_nc_ohc=LEPoaNJgZEUAX-UOm4s&_nc_ht=scontent.fdac33-1.fna&oh=00_AfANW-iep_iLotnoo5cYMsY3s7FwnsQEm1pVRssLKuA0pg&oe=63B27745"
            alt=""
            className="object-cover object-center w-full bg-gradient-to-r from-blue-200 via-red-500 to-blue-200 md:max-h-[500px]  bg-gray-500"
          />
          <div className="absolute bottom-0 right-0 m-10">
            <button className="bg-white hover:bg-gray-200 px-4 py-2 rounded-md font-semibold">
              <i className="mr-2 fa-solid fa-camera"></i>Edit Cover Photo
            </button>
          </div>
        </div>
        <div className="h-[150px] flex justify-center items-center relative  bg-red-00">
          <div className="w-[1500px] h-[150px]">
            <div className="absolute flex justify-center items-center -top-14 left-12 ">
              <div className="relative">
                <img
                  alt=""
                  className="w-[150px]  h-[150px] rounded-full ring-2 ring-offset-4 dark:bg-gray-500  ring-offset-white"
                  src="https://source.unsplash.com/40x40/?portrait?3"
                />
                <button className="absolute bg-gray-50 border border-black hover:bg-gray-200 hover:text-gray-800 text-gray-500 p-3 w-12 text-xl flex justify-center items-center h-12 rounded-full  bottom-0 right-0">
                  <i className="fa-solid fa-camera "></i>
                </button>
              </div>
              <div className="my-14 mx-10">
                <h2 className="text-4xl font-bold capitalize ">shohag</h2>
                <p>1.7k followwrs </p>
                <div className="my-2 flex -space-x-1">
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                  <img
                    alt=""
                    className="w-8 h-8 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[250px] text-center mr-12">
            <button className="px-6 py-2 bg-blue-200 hover:bg-blue-400 font-semibold rounded-lg">
              Update Profile
            </button>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default DisplayProfilePicture;
