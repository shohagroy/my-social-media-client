import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";
import LikeCommentFunction from "./LikeCommentFunction";
import InputEmoji from "react-input-emoji";
import DisplayComments from "../../Components/DisplayComments/DisplayComments";
import LikeComponent from "./LikeComponent";

const FeedsCard = ({ post, postId, comments }) => {
  const { user } = useContext(AuthContex);
  const toDay = new Date().toLocaleString();
  const [postAuthor, setPostAuthor] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [sliceData, setSliceData] = useState(200);

  useEffect(() => {
    fetch(
      `https://my-social-media-server.vercel.app/findUser?email=${user.email}&userEmail=${post.user}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPostAuthor(data);
      });
  }, []);

  const likeEmoji = post.react.filter((emoji) => emoji.emojiName === "like");
  const loveEmoji = post.react.filter((emoji) => emoji.emojiName === "love");
  const hahaEmoji = post.react.filter((emoji) => emoji.emojiName === "haha");
  const sadEmoji = post.react.filter((emoji) => emoji.emojiName === "sad");

  const totalReact =
    likeEmoji.length + loveEmoji.length + hahaEmoji.length + sadEmoji.length;
  const displayEmoji = [likeEmoji, loveEmoji, hahaEmoji, sadEmoji]
    .sort(function (a, b) {
      return b.length - a.length;
    })
    .slice(0, 3);

  const displayEmojiLink = displayEmoji.map((emojidata) => {
    if (emojidata) {
      return emojidata[0]?.emojiImage;
    }
  });

  let postTime;
  const currentMilisecend = new Date(toDay).setMilliseconds(52);
  const postDateMilisecend = new Date(post.date).setMilliseconds(52);
  // const postMilisecend = currentMilisecend - postDateMilisecend;
  const postMinute = parseInt(
    (currentMilisecend - postDateMilisecend) / 1000 / 60
  );

  if (postMinute < 1) {
    postTime = " just now!";
  }

  if (postMinute > 0 && postMinute < 60) {
    postTime = `${postMinute} minute ago.`;
  }

  if (postMinute > 60 && postMinute < 60 * 60) {
    postTime = `${parseInt(postMinute / 60)} hour ago`;
  }

  if (postMinute > 60 * 60 && postMinute < 60 * 60 * 24) {
    postTime = `${parseInt(postMinute / 60 / 24)} day ago.`;
  }

  const addCommentHandelar = () => {
    setLoading(true);

    const comment = {
      postId,
      user: user.displayName,
      email: user.email,
      comment: newComment,
      commentDate: toDay,
    };

    fetch(
      `https://my-social-media-server.vercel.app/addNewComment?email=${user.email}&id=${postId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
        body: JSON.stringify(comment),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      });
  };

  return (
    <section className="my-4">
      <div className="rounded-md shadow-md  bg-white border text-gray-800">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <Link to={`/profile/view?id=${postAuthor._id}`}>
              <img
                alt=""
                src={postAuthor.photoUrl}
                className="w-12 m-2 h-12 rounded-full ring-2 bg-white ring-blue-400 "
              />
            </Link>
            <div className="-space-y-1 m-1">
              <h2 className="font-semibold text-xl leading-none">
                <Link to={`/profile/view?id=${postAuthor._id}`}>
                  {postAuthor.name}{" "}
                </Link>
                <span
                  className={`text-md font-normal  text-gray-500 ${
                    !post.isProfilePicture && "hidden"
                  }`}
                >
                  updated his profile picture {postTime}
                </span>
              </h2>
              <span className="inline-block  leading-none text-gray-400">
                <i title="Public" className="fa-solid fa-earth-americas"></i>{" "}
                <span>{postTime}</span>
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
          {post.text && (
            <p>
              {post.text.slice(0, sliceData)}{" "}
              {post.text.length > 200 && (
                <Link
                  onClick={() => setSliceData(post.text.length)}
                  className="text-blue-600"
                >
                  {" "}
                  ... Read More
                </Link>
              )}
            </p>
          )}
        </div>

        {post.image && (
          <Link to={`/profile/viewfullpost?id=${post._id}`}>
            <img
              src={post.image}
              alt=""
              className="object-cover object-center md:object-contain  w-full bg-gradient-to-r from-blue-200 via-red-500 to-blue-200 md:max-h-[600px]  bg-gray-500"
            />
          </Link>
        )}
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <div className="flex flex-wrap items-center pt-3 pb-1">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {displayEmojiLink?.map(
                    (link, i) =>
                      link && (
                        <img
                          key=""
                          alt=""
                          className="w-5 h-5 rounded-full bg-gray-500 border-gray-800"
                          src={link}
                        />
                      )
                  )}
                </div>

                <div>
                  <p className={`${totalReact === 0 ? "hidden" : "block"}`}>
                    {totalReact}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className={`${post.totalComments === 0 ? "hidden" : "block"}`}>
              {post.totalComments} Comments
            </p>
          </div>
        </div>
        <hr />
        {/* <LikeCommentFunction
          setReactCount={setReactCount}
          postId={postId}
          reacts={post.react}
          postAuthor={postAuthor}
        /> */}
        <LikeComponent postId={postId} post={post} postAuthor={postAuthor} />
        <hr />
        <div className="p-3">
          <div className="space-y-3">
            <div className=" w-full">
              <InputEmoji
                value={newComment}
                cleanOnEnter
                onChange={setNewComment}
                onEnter={addCommentHandelar}
                placeholder="Write a Comment!"
              />
            </div>
            {loading && (
              <div className=" rounded shadow-md w-full animate-pulse bg-gray-">
                <div className="flex p-4 space-x-4 sm:px-8">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-400"></div>
                  <div className="flex-1 py-2 space-y-4">
                    <div className="w-full h-3 rounded bg-gray-400"></div>
                    <div className="w-5/6 h-3 rounded bg-gray-400"></div>
                  </div>
                </div>
              </div>
            )}
            {comments.slice(0, 2).map((comment) => (
              <DisplayComments
                postId={postId}
                comment={comment}
                comments={comments}
                key={comment._id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedsCard;
