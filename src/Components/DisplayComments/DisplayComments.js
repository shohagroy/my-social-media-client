import { toContainElement } from "@testing-library/jest-dom/dist/matchers";
import React, { useContext, useState } from "react";
import { AuthContex } from "../GobalAuthProvaider/GobalAuthProvaider";

const DisplayComments = ({ comment: newComment, postId, comments }) => {
  const { user } = useContext(AuthContex);
  const [commentAuthor, setCommentAuthor] = useState({});
  const toDay = new Date().toLocaleString();

  const { commentDate, comment, email, user: commentUser } = newComment;
  console.log(comment);

  console.log(email);

  useState(() => {
    fetch(
      `http://localhost:5000/commentUsers?email=${user.email}&authorEmail=${email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCommentAuthor(data);
        console.log(data);
      });
  }, []);
  let postTime;
  const currentMilisecend = new Date(toDay).setMilliseconds(52);
  const postDateMilisecend = new Date(commentDate).setMilliseconds(52);
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
    <div>
      {postId === newComment.postId && (
        <div className="flex justify-center items-start mx-4">
          <img
            alt={commentUser}
            title={commentUser}
            src={commentAuthor.photoUrl}
            className="w-10 m-2 h-10 rounded-full ring-2 bg-white ring-blue-400 "
          />
          <div className=" w-full">
            <p className="bg-gray-100 w-full p-3 text-xl focus:outline-none rounded-xl">
              {comment}
            </p>
            <p className="text-right text-gray-600">
              <small>{postTime}</small>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayComments;
