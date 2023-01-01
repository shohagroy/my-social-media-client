import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const LikeCommentFunction = ({ reacts, postId, setReactCount, postAuthor }) => {
  const { user, setUpdateReact, updateReact, socket } = useContext(AuthContex);
  const [mouseHover, setMonuseHover] = useState(false);

  // ___________________________________________________________________________

  const reactUser = { name: user.displayName, email: user.email };

  let displayEmoji;
  let totalCount = 0;

  reacts.map((react) => {
    const reactCount = react?.user.length;
    totalCount = totalCount + reactCount;

    react.user.forEach((ujr) => {
      if (ujr.email === user.email) {
        displayEmoji = react.emoji;
      }
    });
  });

  setReactCount(totalCount);

  const reactUpdateHandelar = (mySelect) => {
    setUpdateReact(!updateReact);
    const reactId = mySelect._id;
    let updatedReact;
    let remainUser;
    reacts.forEach((reac) => {
      remainUser = reac.user.filter((us) => us.email !== user.email);

      let allUser;
      if (reac._id === reactId) {
        const updateReact = [...remainUser, reactUser];
        allUser = updateReact;
        const update = { ...reac, user: allUser };
        updatedReact = update;
      }
    });

    const remainReact = reacts.filter((react) => react._id !== reactId);

    const reactUpdated = [...remainReact, updatedReact];

    setMonuseHover(false);
    fetch(
      `https://my-social-media-server.vercel.app/setNewReact?email=${user.email}&id=${postId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
        body: JSON.stringify(reactUpdated),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        socket.emit("sendNotification", {
          senderName: user.displayName,
          senderEmail: user.email,
          receiverName: postAuthor.email,
          postId,
          type: mySelect.name,
          // date: "123",
        });
      });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        onMouseEnter={() => setMonuseHover(true)}
        onMouseLeave={() => setMonuseHover(false)}
        className={`w-[50%] p-1 relative`}
      >
        <button className="py-2 flex justify-center items-center rounded-md hover:bg-gray-200 w-full duration-300 font-semibold">
          {" "}
          {displayEmoji ? (
            <img
              className="object-cover w-8 mr-3 duration-1000 border-2 rounded-full border-white"
              src={displayEmoji}
              alt=""
            />
          ) : (
            <span>
              <i className="mr-3 text-xl fa-solid fa-thumbs-up"></i>
            </span>
          )}
          Like
        </button>
        {mouseHover && (
          <div className="absolute flex justify-center items-center rounded-full bg-white p-1 border border-black w-full top-[-6vh]">
            {reacts
              .sort((a, b) => (a._id > b._id ? 1 : -1))
              .map((react, i) => (
                <button
                  key={react._id}
                  onClick={() => reactUpdateHandelar(react)}
                  className="w-[60px] hover:w-[70px]  duration-300 mx-1 "
                >
                  <img
                    className="object-cover duration-1000 border-2 rounded-full border-white"
                    src={react.emoji}
                    alt={react.name}
                  />
                </button>
              ))}
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
  );
};

export default LikeCommentFunction;
