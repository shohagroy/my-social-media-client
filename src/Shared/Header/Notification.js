import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ notification }) => {
  const toDay = new Date().toLocaleString();

  let postTime;
  const currentMilisecend = new Date(toDay).setMilliseconds(52);
  const postDateMilisecend = new Date(notification?.date).setMilliseconds(52);
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
  return (
    <div className="">
      <Link to={`/profile/view?id=${notification.postId}`}>
        <div
          className={`duration-300 p-2 flex justify-between cursor-pointer hover:bg-gray-100 h-[10vh] ${
            !notification?.isSeen && "bg-blue-100"
          }`}
        >
          <div className="flex flex-row">
            <div className=" p-2 relative">
              <div className="w-16 h-16  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  className="rounded-full w-16 h-16"
                  alt={notification}
                  src={notification?.userImage}
                />
              </div>
              <img
                className="absolute right-0 bottom-0 w-10"
                src={notification?.emojiImage}
                alt=""
              />
            </div>

            <div className="ml-2">
              <h2 className="text-xl font-semibold">
                {notification?.reactUser}
              </h2>
              <p>
                <span className="capitalize">{notification?.emojiName}</span> a
                your post!
              </p>
            </div>
            <p></p>
          </div>
          <small className="text-right">{postTime}</small>
        </div>
        <hr />
      </Link>
    </div>
  );
};

export default Notification;
