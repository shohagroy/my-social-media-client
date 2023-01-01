import { createBrowserRouter } from "react-router-dom";
import FindFriend from "../Components/FindFriend.js/FindFriend";
import MainLayout from "../Layout/MainLayout";
import SecenderyLayout from "../Layout/SecenderyLayout";
import EmojiUpdate from "../Page/Devoloper/EmojiUpdate/EmojiUpdate";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Feed from "../Page/Home/Feed";
import InputBasicInfo from "../Page/InputBasicInfo/InputBasicInfo";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp";
import UpdateProfile from "../Page/UpdateProfile/UpdateProfile";
import ViewProfile from "../Page/ViewProfile/ViewProfile";
import ViewDetailsPost from "../Shared/ViewDetailsPost/ViewDetailsPost";
import PrivatePouter from "./PrivatePouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivatePouter>
        <MainLayout />
      </PrivatePouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Feed /> },
      { path: "/", element: <FindFriend /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: (
      <PrivatePouter>
        <SecenderyLayout />
      </PrivatePouter>
    ),
    children: [
      {
        path: "/profile/update",
        element: <UpdateProfile />,
      },
      {
        path: "/profile/viewfullpost",
        element: <ViewDetailsPost />,
      },
      {
        path: "/profile/view",
        element: <ViewProfile />,
      },
    ],
  },

  {
    path: "/profilePictureCreate",
    element: (
      <PrivatePouter>
        <InputBasicInfo />
      </PrivatePouter>
    ),
  },
  {
    path: "/developermode",
    element: (
      <PrivatePouter>
        <EmojiUpdate />
      </PrivatePouter>
    ),
  },
]);
