import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const DisplayProfilePicture = () => {
  const { user, logOut, updateProfilePicture } = useContext(AuthContex);
  const [viewProfile, setViewProfile] = useState({});
  const [coverModal, setCoverModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [coverPhotoFetching, setCoverPhotoFatching] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleString();

  const imgbbHostKey = process.env.REACT_APP_imgbb_host_key;

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const profileId = params.id;

  let url = `https://my-social-media-server.vercel.app/viewProfile?email=${user.email}`;

  if (profileId) {
    url = `https://my-social-media-server.vercel.app/findUserProfile?email=${user.email}&id=${profileId}`;
  }

  useEffect(() => {
    setLoading(true);
    setCoverPhotoFatching(true);
    fetch(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("weShare")}`,
      },
    })
      .then((res) => {
        if (res.massahe) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        setViewProfile(data);
        setCoverPhotoFatching(false);
        setLoading(false);
      });
  }, [user]);

  const updateCoverPhotoHandelar = (e) => {
    e.preventDefault();
    setCoverModal(!coverModal);
    setCoverPhotoFatching(true);
    const coverPhotoFile = e.target.coverPhoto.files;

    const fromData = new FormData();
    const coverPhoto = coverPhotoFile[0];
    fromData.append("image", coverPhoto);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        fetch(
          `https://my-social-media-server.vercel.app/userCoverPhotoUpdate?email=${user.email}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("weShare")}`,
            },
            body: JSON.stringify({ url: imgData.data.url }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setViewProfile(data);
            setCoverPhotoFatching(false);
          });
      });
  };

  const updateProfilePictureHandelar = (e) => {
    e.preventDefault();
    setProfileModal(!profileModal);
    setLoading(true);
    const profilePictureFile = e.target.profilePicture.files;

    const fromData = new FormData();
    const profilePictureUrl = profilePictureFile[0];
    fromData.append("image", profilePictureUrl);

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
                react: [
                  {
                    _id: 1,
                    name: "like",
                    emoji: "https://i.ibb.co/7J4wZXV/like.gif",
                    user: [],
                  },
                  {
                    _id: 2,
                    name: "love",
                    emoji: "https://i.ibb.co/KxcYzBQ/love.gif",
                    user: [],
                  },
                  {
                    _id: 3,
                    name: "haha",
                    emoji: "https://i.ibb.co/hYW2t8F/haha.gif",
                    user: [],
                  },
                  {
                    _id: 4,
                    name: "sad",
                    emoji: "https://i.ibb.co/8rw0Y4x/sad.gif",
                    user: [],
                  },
                ],
                totalReact: 0,
                totalComments: 0,
              };
              fetch(
                `https://my-social-media-server.vercel.app/userProfilePhotoUpdate?email=${user?.email}`,
                {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("weShare")}`,
                  },
                  body: JSON.stringify(newPost),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setLoading(false);
                  setViewProfile(data);
                });
            })
            .catch((error) => console.error(error));
        }
      });
  };

  return (
    <section className="">
      <div className=" h-[650px]">
        <div className="w-full h-[500px] relative">
          {coverPhotoFetching ? (
            <div className="flex h-[500px] flex-col rounded shadow-md  animate-pulse w-full">
              <div className=" rounded-t h-[500px] bg-gray-700"></div>
            </div>
          ) : viewProfile?.coverPhoto ? (
            <img
              src={viewProfile.coverPhoto}
              alt=""
              className="object-cover object-center w-full bg-gradient-to-r from-blue-200 via-red-500 to-blue-200 md:max-h-[500px]  bg-gray-500"
            />
          ) : (
            <img
              src="https://www.79design.org.uk/wp-content/uploads/2021/05/seo-agency-lincolnshire-head-1.jpg"
              alt=""
              className="object-cover object-center z-30 w-full bg-gradient-to-r from-blue-200 via-red-500 to-blue-200 md:max-h-[500px]  bg-gray-500"
            />
          )}

          <div className="absolute bottom-0 right-0 m-10">
            {viewProfile.email === user.email && (
              <button
                onClick={() => setCoverModal(!coverModal)}
                className="bg-white hover:bg-gray-200 px-4 py-2 rounded-md font-semibold"
              >
                <i className="mr-2 fa-solid fa-camera"></i>Edit Cover Photo
              </button>
            )}
          </div>
        </div>
        <div className="h-[150px] flex justify-center items-center relative  bg-red-00">
          <div className="w-[1500px] h-[150px]">
            <div className="absolute flex justify-center items-center -top-14 left-12 ">
              <div className="relative">
                {loading ? (
                  <div className="animate-pulse bg-white rounded-full ">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0 ring-offset-4 ring-2  ring-offset-white w-[150px]  h-[150px] rounded-full bg-gray-700"></div>
                    </div>
                  </div>
                ) : (
                  <img
                    alt=""
                    className="w-[150px]  h-[150px] rounded-full ring-2 ring-offset-4 dark:bg-gray-500  ring-offset-white"
                    src={viewProfile.photoUrl}
                  />
                )}

                {viewProfile.email === user.email && (
                  <button
                    onClick={() => setProfileModal(!profileModal)}
                    className="absolute bg-gray-50 border border-black hover:bg-gray-200 hover:text-gray-800 text-gray-500 p-3 w-12 text-xl flex justify-center items-center h-12 rounded-full  bottom-0 right-0"
                  >
                    <i className="fa-solid fa-camera "></i>
                  </button>
                )}
              </div>
              <div className="my-16 mx-10">
                <h2 className="text-4xl font-bold capitalize ">
                  {viewProfile.name}
                </h2>
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
          {viewProfile.email === user.email ? (
            <div className="w-[250px] text-center mr-12">
              <Link to={`/profile/update`}>
                <button className="px-6 py-2 bg-blue-200 hover:text-white duration-300 hover:bg-blue-400 font-semibold rounded-lg">
                  Update Profile
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-[250px] text-center mr-12">
              <button className="px-6 py-2 bg-blue-300 hover:text-white duration-300 hover:bg-blue-600 font-semibold rounded-lg">
                Add Friend
              </button>
            </div>
          )}
        </div>
        <hr />
      </div>
      {coverModal && (
        <div className="absolute md: flex justify-center items-center top-0  h-full left-0 w-full">
          <div className="flex justify-center items-center">
            <form
              onSubmit={(e) => updateCoverPhotoHandelar(e)}
              action=""
              className="border  p-4 bg-white rounded-xl shadow-lg text-center w-full "
            >
              <div>
                <div className="flex justify-end">
                  <p
                    onClick={() => setCoverModal(!coverModal)}
                    className="cursor-pointer w-12 h-12 p-2 text-xl hover:text-red-600 hover:border-red-600 text-black border-2 border-black rounded-full"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </div>
                <fieldset className="md:w-[400px] space-y-1 text-gray-100">
                  <div className="">
                    <input
                      type="file"
                      name="coverPhoto"
                      id="files"
                      className="px-8 py-12 w-full border-2 my-3 border-dashed rounded-md border-gray-700 text-gray-400 bg-gray-100"
                    />
                  </div>
                </fieldset>
                <button className="w-full py-3 duration-300 rounded-md font-semibold hover:text-white bg-blue-200 hover:bg-blue-500">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {profileModal && (
        <div className="absolute md: flex justify-center items-center top-0  h-full left-0 w-full">
          <div className="flex justify-center items-center">
            <form
              onSubmit={(e) => updateProfilePictureHandelar(e)}
              className="border  p-4 bg-white rounded-xl shadow-lg text-center w-full "
            >
              <div>
                <div className="flex justify-end">
                  <p
                    onClick={() => setProfileModal(!profileModal)}
                    className="cursor-pointer w-12 h-12 p-2 text-xl hover:text-red-600 hover:border-red-600 text-black border-2 border-black rounded-full"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </div>
                <fieldset className="md:w-[400px] space-y-1 text-gray-100">
                  <div className="">
                    <input
                      type="file"
                      name="profilePicture"
                      id="files"
                      className="px-8 py-12 w-full border-2 my-3 border-dashed rounded-md border-gray-700 text-gray-400 bg-gray-100"
                    />
                  </div>
                </fieldset>
                <button className="w-full py-3 duration-300 rounded-md font-semibold hover:text-white bg-blue-200 hover:bg-blue-500">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DisplayProfilePicture;
