import React, { useContext, useState } from "react";
import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";
import InputEmoji from "react-input-emoji";
import Skeleton from "../../Shared/Loaders/Skeleton";

const CreateNewFeed = () => {
  const { user } = useContext(AuthContex);
  const [emoji, setEmoji] = useState();
  const [postToggle, setPostToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleString();

  const imgbbHostKey = process.env.REACT_APP_imgbb_host_key;

  const createNewFeedHandelar = (e) => {
    e.preventDefault();
    setLoading(true);
    setPostToggle(false);
    const postImage = e.target.imageFile.files;

    console.log(postImage);
    if (postImage) {
      const fromData = new FormData();
      const picture = postImage[0];
      fromData.append("image", picture);

      const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

      fetch(url, {
        method: "POST",
        body: fromData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          console.log(imgData);
          if (imgData.success) {
            const newPost = {
              user: user.email,
              isProfilePicture: false,
              text: emoji,
              image: imgData.data.url,
              date,
              react: [
                { like: 0, user: [] },
                { love: 0, user: [] },
                { haha: 0, user: [] },
              ],
              totalReact: 0,
              allComment: [{ comment: "", userEmail: "", date }],
            };

            fetch(
              `http://localhost:5000/createNewPost?userEmail=${user?.email}`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${localStorage.getItem("weShare")}`,
                },
                body: JSON.stringify(newPost),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data.insertedId);
                setLoading(false);
              });
          }
        });
    }
  };

  return (
    <section className=" w-full">
      <div className="w-full border py-8 px-4 bg-gray-100 my-1 rounded-lg ">
        <form
          onSubmit={(e) => createNewFeedHandelar(e)}
          className="w-full relative"
        >
          <div className="flex justify-center items-center">
            <img
              alt={user.displayName}
              className="w-10 h-10 rounded-full ring ring-offset-2 dark:bg-gray-500 ring-gray-700 ring-offset-gray-600"
              src={user.photoURL}
            />
            <div className=" w-full">
              <InputEmoji
                value={emoji}
                onChange={setEmoji}
                placeholder="What's Happening?"
              />
            </div>
          </div>
          <hr className=" my-1 border-black" />

          <div className="flex justify-between px-6  items-center w-full">
            <p
              onClick={() => setPostToggle(!postToggle)}
              className="text-2xl cursor-pointer"
            >
              <i className="fa-solid fa-image"></i> <span>Add Photos</span>
            </p>
            <input
              type={emoji ? "submit" : "button"}
              value="Post"
              className={`px-6 py-2 cursor-pointer font-semibold duration-300 text-gray-300 border-2 rounded-lg hover:bg-blue-600 
              ${emoji ? "bg-blue-600" : "bg-blue-300"} `}
            />
          </div>

          {postToggle && (
            <div className="absolute left-0 top-14  bg-white p-8 border shadow-xl w-full">
              <div className="flex justify-center items-center">
                <img
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full ring ring-offset-2 dark:bg-gray-500 ring-gray-700 ring-offset-gray-600"
                  src={user.photoURL}
                />
                <div className=" w-full">
                  <div className="text-right -mt-4">
                    <p className="">
                      <i
                        onClick={() => setPostToggle(!postToggle)}
                        className="fa-solid cursor-pointer text-3xl text-red-600 fa-circle-xmark"
                      ></i>
                    </p>
                  </div>
                  <fieldset className="w-full space-y-1 text-gray-100">
                    <div className="flex">
                      <input
                        required={postToggle}
                        type="file"
                        name="imageFile"
                        id="files"
                        className="px-8 mx-4 w-full py-8 border-2 border-dashed rounded-md border-gray-700 text-gray-900 bg-gray-50"
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
              <hr className=" my-1 border-black" />
              <div className="px-6  w-full">
                <input
                  type="submit"
                  value="Post"
                  className={`px-6 w-full read-only: text-center ml-5 py-2 cursor-pointer font-semibold duration-300 text-gray-100 border-2 rounded-lg bg-blue-600 
                `}
                />
              </div>
            </div>
          )}
        </form>
      </div>
      {loading && <Skeleton />}
    </section>
  );
};

export default CreateNewFeed;

// <p>
//             <i className="fa-solid fa-earth-americas"></i>
//           </p>
