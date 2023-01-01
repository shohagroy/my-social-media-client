import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebasae/Firebase";

export const AuthContex = createContext();
const GobalAuthProvaider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [updateReact, setUpdateReact] = useState(false);
  const [socket, setSocket] = useState(null);

  const auth = getAuth(app);
  // create user function
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateDisplayName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  // update user profile profile
  const updateProfilePicture = (photoUrl) => {
    return updateProfile(auth.currentUser, {
      photoURL: photoUrl,
    });
  };

  // user log Out function
  const logOut = () => {
    setLoader(true);
    return signOut(auth)
      .then(() => {
        // user sign out
        localStorage.removeItem("token");
        setUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // user sign in function
  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = (provider) => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoader(false);
    });
    return () => unSubscribe();
  }, [user]);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5001"));
  // }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", user.email);
  // }, [socket, user.email]);

  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   socket?.on("getNotification", (data) => {
  //     setNotifications((prev) => [...prev, data]);

  //     fetch(`https://my-social-media-server.vercel.app/addNewComment?email=${user.email}`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("weShare")}`,
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {});
  //   });
  // }, [socket]);
  const toDay = new Date().toLocaleString();

  const authInfo = {
    setUpdateReact,
    toDay,
    updateReact,
    user,
    logOut,
    loader,
    createUser,
    updateDisplayName,
    updateProfilePicture,
    login,
    googleSignIn,
    socket,
  };
  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default GobalAuthProvaider;
