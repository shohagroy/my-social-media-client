import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";
import demoProfile from "../../Assets/demo user.png";
import NotificationCard from "./NotificationCard";
import MassengerCard from "./MassengerCard";

const Navigation = () => {
  const { user, logOut } = useContext(AuthContex);
  const [openNotification, setOpenNotification] = useState(false);
  const [openMassenger, setOpenMassenger] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [getNotification, setGetNotification] = useState(false);

  useEffect(() => {
    fetch(
      `https://my-social-media-server.vercel.app/getNotifications?userEmail=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("weShare")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  }, [user, getNotification]);

  setInterval(() => {
    setGetNotification(!getNotification);
  }, 10000);

  const unseenNotification = notifications.filter(
    (notification) => notification.isSeen === false
  );

  const openNotificationHandelar = () => {
    setOpenMassenger(false);
    setOpenNotification(!openNotification);
  };
  const openMassengerHandelar = () => {
    setOpenNotification(false);
    setOpenMassenger(!openMassenger);
  };

  return (
    <nav className="px-10 py-2 z-50 relative bg-blue-200 flex justify-between items-center">
      <div className="w-[300px] z-50">
        <Link to="/">
          {/* <img src="" alt="WeShare!" /> */}
          <p className="text-4xl font-bold">WeShare!</p>
        </Link>
      </div>
      <div className="w-[600px]">
        <fieldset className="w-full space-y-1 text-gray-200">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="button"
                title="search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 text-gray-900"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full p-4 pl-16 rounded-2xl focus:outline-none bg-gray-100 text-gray-900 text-lg "
            />
          </div>
        </fieldset>
      </div>

      <div className="flex w-[300px] z-50 justify-end">
        <div className="text-3xl flex relative">
          <div className="w-14 h-14 text-gray-400 hover:text-gray-700 bg-gray-100 mr-4 border border-gray-400 hover:border-black duration-300 rounded-full flex justify-center items-center mx-3">
            <Link to="/">
              <i className="fa-solid fa-house-chimney"></i>
            </Link>
          </div>

          <button
            onClick={openMassengerHandelar}
            className="w-14 h-14 text-gray-400 relative hover:text-gray-700 bg-gray-100 mr-4 border border-gray-400 hover:border-black duration-300 rounded-full flex justify-center items-center mx-3"
          >
            <p>
              <i className="fa-brands fa-facebook-messenger"></i>
            </p>

            <span className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              1
            </span>
          </button>

          <button
            onClick={openNotificationHandelar}
            className="w-14 h-14 relative text-gray-400 hover:text-gray-700 bg-gray-100 mr-4 border border-gray-400 hover:border-black duration-300 rounded-full flex justify-center items-center mx-3"
          >
            <p>
              <i className="fa-solid fa-bell"></i>
            </p>

            <span
              className={`${
                notifications.length ? "absolute" : "hidden"
              } top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full`}
            >
              {unseenNotification.length}
            </span>
          </button>
          <button
            className="text-md"
            onClick={() => setOpenProfile(!openProfile)}
          >
            {user.photoURL ? (
              <img
                alt={user.displayName}
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                src={user.photoURL}
              />
            ) : (
              <img
                alt={user.displayName}
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                src={demoProfile}
              />
            )}
          </button>

          {openProfile && (
            <div className="w-[350px] z-50 absolute right-0 top-[100%]  bg-white p-3 rounded-xl shadow-2xl">
              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="py-5 hover:bg-gray-100 duration-300 rounded-lg bg-white flex shadow-lg justify-center items-center"
              >
                <Link>
                  {user.photoURL ? (
                    <img
                      alt=""
                      className="w-10 h-10 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                      src={user.photoURL}
                    />
                  ) : (
                    <img
                      alt={user.displayName}
                      className="w-10 h-10 hidden rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                      src={demoProfile}
                    />
                  )}
                </Link>

                <p className="text-2xl ml-5 font-semibold">
                  {user.displayName}
                </p>
              </div>

              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="my-5 text-xl"
              >
                <div className="p-3 hover:bg-gray-100 duration-300 rounded-lg bg-  flex items-center">
                  <Link
                    to="/profile/update"
                    className="flex justify-between items-center w-full"
                  >
                    <p className="">
                      <i className="fa-solid p-2 rounded-full bg-gray-200 mr-2 fa-user"></i>
                      <span>Update Profile</span>
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
                <div
                  onClick={() => setOpenProfile(!openProfile)}
                  className="p-3 hover:bg-gray-100 duration-300 rounded-lg bg-  flex items-center"
                >
                  <Link className="flex justify-between items-center w-full">
                    <p className="">
                      <i className="fa-solid p-2 rounded-full bg-gray-200 mr-2 fa-gear"></i>
                      <span>Change Password</span>
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="p-3 hover:bg-gray-100 duration-300 rounded-lg bg-  flex items-center">
                  <button onClick={() => logOut()} className="">
                    <p className="">
                      <i className="fa-solid p-2 rounded-full bg-gray-200 mr-2 fa-right-from-bracket"></i>
                      <span>Log Out</span>
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={`absolute  z-50 bg-white  md:w-[420px] duration-300 h-screen p-4 shadow-2xl top-[8vh]  ${
            openNotification ? "right-0" : "right-[-450px]"
          } `}
        >
          <NotificationCard notifications={notifications} />
        </div>
        <div
          className={`absolute  md:w-[420px] bg-white duration-300 h-screen p-4 shadow-2xl top-[8vh]  ${
            openMassenger ? "right-0" : "right-[-450px]"
          }`}
        >
          <MassengerCard />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
