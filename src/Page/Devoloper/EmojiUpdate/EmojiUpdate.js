import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../Components/GobalAuthProvaider/GobalAuthProvaider";

const EmojiUpdate = () => {
  const { user } = useContext(AuthContex);

  const [loading, setLoading] = useState(false);

  const addEmojiHandelar = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;

    const emojiName = form.emojiName.value;
    const emojiLink = form.emojiLink.value;
    const emojiImage = form.emojiImage.value;
    const emojiSerial = form.emojiSerial.value;

    const newEmoji = { emojiName, emojiLink, emojiImage, emojiSerial };

    fetch(
      `https://my-social-media-server.vercel.app/addEmoji?userEmail=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
        body: JSON.stringify(newEmoji),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      });
  };

  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl text-center">Update Emoji</h2>
        <div className="flex justify-center h-screen w-full items-center">
          <form
            onSubmit={(e) => addEmojiHandelar(e)}
            className="my-3 w-[500px] border-2 rounded-xl p-3"
            action=""
          >
            <input
              type="text"
              placeholder="emoji name"
              required
              name="emojiName"
              className="w-full bg-gray-200 p-2 rounded-xl my-2"
            />
            <input
              type="text"
              placeholder="emoji link"
              required
              name="emojiLink"
              className="w-full bg-gray-200 p-2 rounded-xl my-2"
            />
            <input
              type="text"
              placeholder="emoji image link"
              required
              name="emojiImage"
              className="w-full bg-gray-200 p-2 rounded-xl my-2"
            />
            <input
              type="number"
              placeholder="emoji serial"
              required
              name="emojiSerial"
              className="w-full bg-gray-200 p-2 rounded-xl my-2"
            />

            <button className="w-full bg-blue-200 hover:bg-blue-600 hover:text-white duration-300  p-2 rounded-xl my-2">
              Add Emoji
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmojiUpdate;
