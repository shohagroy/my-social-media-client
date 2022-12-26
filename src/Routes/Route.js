import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Page/ErrorPage/ErrorPage";
import Feed from "../Page/Home/Feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Feed /> }],
  },
]);
