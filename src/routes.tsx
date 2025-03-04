import { Suspense} from "react";
import { RouteObject } from "react-router-dom";
import Layout from "./App/Dashboard/Layout";
import SignIn from "./App/Onboarding/SignIn";
import SignUp from "./App/Onboarding/SignUp";

export const routes: RouteObject[] = [
  {
    path:'/',
    element:<SignIn/>
  },
  {
    path:'/sign-up',
    element:<SignUp/>
  },
  {
    path: "homepage",
    element: <Layout/>,
    children: [
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={"Loading..."}></Suspense>
            ),
         },
        ] 
      }
    ],
  },
];
