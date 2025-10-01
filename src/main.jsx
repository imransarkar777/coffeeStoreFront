import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./LayOuts/MainLayout.jsx";
import Home from "./Components/Home.jsx";
import AddCoffee from "./Components/AddCoffee.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import CoffeeDetails from "./Components/CoffeeDetails.jsx";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import { AuthContext } from "./context/AuthContext";
import AuthProvider from "./context/AuthProvider.jsx";
import Users from "./Components/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: async () => {
          try {
            const res = await fetch(
              "https://coffee-store-server-lk2eugtoy-imran-sarkar-setus-projects.vercel.app//coffees"
            );
            return res.json();
          } catch (error) {
            console.error("Connection error:", error);
            return [];
          }
        },
        Component: Home,
      },
      {
        path: "addCoffee",
        Component: AddCoffee,
      },
      {
        path: "coffee/:id",
        Component: CoffeeDetails,
      },
      {
        path: "updatecoffee/:id",
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-lk2eugtoy-imran-sarkar-setus-projects.vercel.app//coffees/${params.id}`
          ),
        Component: UpdateCoffee,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },

      {
        path: "users",
        loader: () =>
          fetch(
            "https://coffee-store-server-lk2eugtoy-imran-sarkar-setus-projects.vercel.app/-rust-five.vercel.app/users"
          ),
        Component: Users,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
