import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const FeedsCard = () => {
  const { user } = useContext(AuthContex);
  const date = new Date().toLocaleString();

  const newPost = {
    user: user.email,
    isProfilePicture: false,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima numquam quidem quis assumenda eaque? Quis veniam tenetur enim doloremque autem saepe ut consectetur iusto laboriosam earum itaque velit, voluptas eligendi corporis? Fuga, facilis? Nulla, blanditiis magni. Alias dolorum obcaecati minima, modi voluptate, dolor asperiores a cum eligendi magni corporis amet.",
    image:
      "https://digitalhub.fifa.com/transform/27b0b0fe-3786-4407-9b93-cb71295d1497/Netherlands-v-Argentina-Quarter-Final-FIFA-World-Cup-Qatar-2022",
    date: 'date: "12/27/2022, 11:54:46 PM',
    react: [
      { like: 0, user: [] },
      { love: 0, user: [] },
      { haha: 0, user: [] },
    ],
    totalReact: 0,
    allComment: [{ comment: "", userEmail: "", date: "" }],
  };

  console.log(newPost.allComment.length);

  //   console.log(newPost);
  return (
    <section className="my-4">
      <div className="rounded-md shadow-md  bg-white border text-gray-800">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <Link>
              <img
                alt=""
                src={user.photoURL}
                className="w-12 m-2 h-12 rounded-full ring-2 bg-white ring-blue-400 "
              />
            </Link>
            <div className="-space-y-1">
              <Link>
                <h2 className="font-semibold leading-none">
                  {user.displayName}
                </h2>
              </Link>
              <span className="inline-block text-xs leading-none text-gray-400">
                Somewhere
              </span>
            </div>
          </div>
          <button title="Open options" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
              <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
              <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
            </svg>
          </button>
        </div>

        <div className="px-4 pb-2 text-xl">
          <p>
            {newPost.text.slice(0, 200)} ...{" "}
            <Link className="text-blue-600">Read More</Link>
          </p>
        </div>
        <img
          src={newPost.image}
          alt=""
          className="object-cover object-center w-full  bg-gray-500"
        />
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <div className="mr-2">
              <p>link </p>
            </div>
            <div className="flex flex-wrap items-center pt-3 pb-1">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <img
                    alt=""
                    className="w-5 h-5 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?1"
                  />
                  <img
                    alt=""
                    className="w-5 h-5 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?2"
                  />
                  <img
                    alt=""
                    className="w-5 h-5 border rounded-full bg-gray-500 border-gray-800"
                    src="https://source.unsplash.com/40x40/?portrait?3"
                  />
                </div>
                <span className="text-sm">
                  Liked by
                  <span className="font-semibold">Mamba UI</span>and
                  <span className="font-semibold">86 others</span>
                </span>
              </div>
            </div>
          </div>
          <div>
            {newPost.allComment.length &&
              `${newPost.allComment.length} 'Comments`}
          </div>
        </div>
        <hr />
        <div className="flex justify-center items-center w-full">
          <div className="w-[50%] p-1 ">
            <button className="py-2 rounded-md hover:bg-gray-200 w-full duration-300 font-semibold">
              {" "}
              <span>
                <i className="mr-2 fa-solid fa-thumbs-up"></i>
              </span>
              Like
            </button>
          </div>
          <div className="w-[50%] p-1 ">
            <button className="py-2 rounded-md hover:bg-gray-200 w-full duration-300 font-semibold">
              {" "}
              <span>
                <i className="mr-2 fa-solid fa-message"></i>
              </span>
              Comment
            </button>
          </div>
        </div>
        <hr />
        <div className="p-3">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full  p-2 bg-transparent border-none rounded border text-gray-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedsCard;
