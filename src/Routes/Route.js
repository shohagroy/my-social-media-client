import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Feed from "../Page/Home/Feed";
import InputBasicInfo from "../Page/InputBasicInfo/InputBasicInfo";
import Login from "../Page/Login/Login";
import SignUp from "../Page/SignUp/SignUp";
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
    children: [{ path: "/", element: <Feed /> }],
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
    path: "/profilePictureCreate",
    element: (
      <PrivatePouter>
        <InputBasicInfo />
      </PrivatePouter>
    ),
  },
]);
