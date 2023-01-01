import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";
import Navigation from "../../Shared/Header/Navigation";
import { Helmet } from "react-helmet";

const InputBasicInfo = () => {
  const { updateProfilePicture, user } = useContext(AuthContex);
  const imgbbHostKey = process.env.REACT_APP_imgbb_host_key;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const date = new Date().toLocaleString();

  const profilePictureUpdateHandelar = (e) => {
    setLoading(true);
    e.preventDefault();

    const imageData = e.target.image.files;

    const fromData = new FormData();
    const profilePicture = imageData[0];
    fromData.append("image", profilePicture);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          updateProfilePicture(imgData.data.url)
            .then(() => {
              const newPost = {
                user: user.email,
                isProfilePicture: true,
                text: "",
                image: imgData.data.url,
                date,
                react: [],
                totalReact: 0,
                totalComments: 0,
              };

              fetch(
                `https://my-social-media-server.vercel.app/createNewPost?userEmail=${user?.email}`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("weShare")}`,
                  },
                  body: JSON.stringify(newPost),
                }
              )
                .then((res) => {
                  setLoading(false);
                  res.json();
                })
                .then((data) => {
                  navigation("/");
                });

              // Profile updated!
            })
            .catch((error) => console.error(error));
        }
      });
  };
  return (
    <section>
      <Helmet>
        <title>Upload Profile Picture - WeShare!</title>
      </Helmet>
      <Navigation />
      <div className="flex flex-col  justify-center items-center h-screen w-full">
        <p className="my-3 text-2xl font-semibold">
          Upload Your Profile Pictire
        </p>
        <form onSubmit={(e) => profilePictureUpdateHandelar(e)}>
          <div className="md:w-[500px] w-[100vw] ">
            <fieldset className="w-full space-y-1 text-gray-900">
              <div className="flex">
                <input
                  type="file"
                  name="image"
                  id="files"
                  className={`px-8 w-full py-12 border-2 border-dashed rounded-md border-gray-700 text-gray-900`}
                />
              </div>
            </fieldset>
          </div>

          <div className="text-center my-2">
            <button
              className={`py-3 px-6 w-full text-xl font-semibold text-gray-500 hover:text-white btn hover:bg-blue-600 duration-300 rounded-xl bg-blue-200 ${
                loading && "loading"
              }`}
            >
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>
          <div className="text-center my-16 text-2xl text-gray-400 hover:text-gray-700 duration-300">
            <Link to="/">Skip</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InputBasicInfo;
