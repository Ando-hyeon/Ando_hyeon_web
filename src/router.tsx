import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./Pages/Main";
import { SignInPage } from "./Pages/Sign/SignIn";
import { SignUpPage } from "./Pages/Sign/SignUp";

const Router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "signIn",
        element: <SignInPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default Router;
