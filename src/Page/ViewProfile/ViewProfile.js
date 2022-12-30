import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";
import DisplayProfilePicture from "../../Shared/DisplayProfilePicture/DisplayProfilePicture";
import FeedsCard from "../../Shared/FeedsCard/FeedsCard";

const ViewProfile = () => {
  const { user } = useContext(AuthContex);
  const [loading, setLoading] = useState(false);
  const [userPost, setuserPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [viewProfile, setViewProfile] = useState({});

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const userId = params.id;

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/profileTramlinefeed?email=${user.email}&id=${userId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setuserPost(data.posts);
        setComments(data.comments);
        setViewProfile(data.viewUser);
        setLoading(false);
      });
  }, [user]);

  console.log(viewProfile);

  return (
    <section className="">
      <div className="max-w-[1200px] mx-auto">
        <div className="border">
          <DisplayProfilePicture />
        </div>

        <div className="">
          <div className="">
            <div className="flex">
              <div className="md:w-[600px] relative ">
                <div className="sticky w-full h-screen top-0 left-0">
                  <div className="w-full h-full px-3 border bg-white shadow-xl">
                    <h3 className="font-semibold text-gray-700 m-3 text-center text-2xl">
                      Profile Overwiew
                    </h3>
                    <hr />
                    <div className="m-2">
                      {viewProfile?.school?.name && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-4xl">
                              <i className="fa-solid my-3 fa-building-columns"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.school?.name}</p>
                              <p>{viewProfile?.school?.address}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile?.college?.name && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-4xl">
                              <i className="fa-solid fa-graduation-cap my-3"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.college?.name}</p>
                              <p>{viewProfile?.college?.address}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile?.work?.name && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-4xl">
                              <i class="fa-solid fa-briefcase my-3"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.work?.name.slice(0, 30)}</p>
                              <p>{viewProfile?.work?.address}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile?.livein?.liveinCity && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-4xl">
                              <i class="fa-solid fa-house-chimney my-3"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.livein?.liveinCity}</p>
                              <p>{viewProfile?.livein?.liveinState}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile?.mobile?.number && (
                        <>
                          {" "}
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-xl">
                              <i class="fa-solid fa-phone my-3"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.mobile?.number}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile?.birthday?.date && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-xl">
                              <i class="fa-solid fa-calendar-days my-3"></i>
                            </p>
                            <div className="font-semibold ml-4">
                              <p>{viewProfile?.birthday?.date}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}

                      {viewProfile.gender && (
                        <>
                          <div className="flex items-center hover:bg-gray-100 duration-300 text-gray-500 hover:text-gray-800 px-3 ">
                            <p className="text-xl">
                              {viewProfile.gender === "male" ? (
                                <i class="fa-solid text-2xl fa-person mr-3"></i>
                              ) : (
                                <i class="fa-solid fa-person-dress mr-3"></i>
                              )}
                            </p>
                            <div className="font-semibold ml-4">
                              <p className="capitalize">
                                {viewProfile?.gender}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-3 ">
                <div>
                  {userPost.map((post) => (
                    <FeedsCard
                      key={post._id}
                      comments={comments}
                      postId={post._id}
                      post={post}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProfile;
