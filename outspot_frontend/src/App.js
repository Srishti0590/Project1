// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddBlogPage from "./pages/AddBlogPage";
import SpotPage from "./pages/SpotPage";
import BlogPage from "./pages/BlogPage";
import UpdateBlogPage from "./pages/UpdateBlogPage";
import AddLocationPage from "./pages/AddLocation";
import AllSpotPage from "./pages/AllSpotPage";
import AllBlogPage from "./pages/AllBlogPage";
import MyBlogsPage from "./pages/MyBlogPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyLocationBookingsPage from "./pages/MyLocationBookings";

const App = () => {
  const ProtectedRoute = (props) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/" replace />;
    }

    return props.children;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.getItem("token") ? <HomePage /> : <LandingPage />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/add"
        element={
          <ProtectedRoute>
            <AddBlogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog/:id"
        element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/all"
        element={
          <ProtectedRoute>
            <AllBlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/update/:id"
        element={
          <ProtectedRoute>
            <UpdateBlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location/add"
        element={
          <ProtectedRoute>
            <AddLocationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location/:id"
        element={
          <ProtectedRoute>
            <SpotPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location/all"
        element={
          <ProtectedRoute>
            <AllSpotPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myblogs"
        element={
          <ProtectedRoute>
            <MyBlogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mybookings"
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mylocations"
        element={
          <ProtectedRoute>
            <MyLocationBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <p className="no-page-warning error-message">
            <span>Error 404</span> No Page Found!😔
          </p>
        }
      />
    </Routes>
  );
};

export default App;

// import RootLayout from "./pages/Root";
// import ErrorPage from "./pages/ErrorPage";

// const token = localStorage.getItem("token");
// console.log(token);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: token ? <HomePage /> : <LandingPage />,
//       },
//       { path: "login", element: <Login /> },
//       { path: "signup", element: <SignUp /> },
//     ],
//   },
// ]);
