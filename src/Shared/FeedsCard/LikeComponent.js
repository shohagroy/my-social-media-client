import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const LikeComponent = ({ post, postId }) => {
  const { user, toDay } = useContext(AuthContex);
  const [mouseHover, setMonuseHover] = useState(false);

  // updateFunction
  const [postEmojis, setPostEmojis] = useState([]);

  useEffect(() => {
    fetch(
      `https://my-social-media-server.vercel.app/getEmoji?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPostEmojis(data);
      });
  }, []);

  const displayEmoji = post.react.find(
    (reactUser) => reactUser.userEmail === user.email
  );

  // ___________________________________________________________________________

  const reactUpdateHandelar = (mySelect) => {
    const reactEmojiInfo = {
      reactUser: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      postId,
      emojiName: mySelect.emojiName,
      emojiImage: mySelect.emojiImage,
      date: toDay,
      isSeen: false,
    };
    setMonuseHover(false);
    fetch(
      `https://my-social-media-server.vercel.app/setNewReact?email=${user.email}&id=${postId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
        body: JSON.stringify(reactEmojiInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  };
  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <div
          onMouseEnter={() => setMonuseHover(true)}
          onMouseLeave={() => setMonuseHover(false)}
          className={`w-[50%] p-1 relative`}
        >
          <button className="py-2 flex justify-center items-center rounded-md hover:bg-gray-200 w-full duration-300 font-semibold">
            {" "}
            {post?.react?.map(
              (react) =>
                react.userEmail === user.email && (
                  <>
                    <img
                      className="object-cover w-8 mr-3 duration-1000 border-2 rounded-full border-white"
                      src={react.emojiImage}
                      alt=""
                    />
                    <span className="capitalize">{react.emojiName}</span>
                  </>
                )
            )}
            {!displayEmoji && (
              <p>
                <span>
                  <i className="mr-3 text-xl fa-solid fa-thumbs-up"></i>
                </span>
                <span>Like</span>
              </p>
            )}
          </button>
          {mouseHover && (
            <div className="absolute w-[250px] py-3 top-[-8vh] ">
              <div className="bg-white h-[6vh] relative p-1 border flex justify-center items-center rounded-full   border-black ">
                <div className="absolute left-0 top-0 flex justify-center items-center ">
                  {postEmojis.map((emoji) => (
                    <button
                      key={emoji._id}
                      onClick={() => reactUpdateHandelar(emoji)}
                      className="w-[50px] hover:w-[60px]  duration-300 mx-1 "
                    >
                      <img
                        className="object-cover  duration-1000 border-2 rounded-full border-white"
                        src={emoji.emojiLink}
                        alt={emoji.emojiName}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default LikeComponent;
