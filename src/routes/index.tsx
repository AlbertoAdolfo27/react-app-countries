import { createBrowserRouter } from "react-router";
// Pages
import Home from "../pages/Home"
import CountryDetail from "../pages/CountryDetail"
import About from "../pages/About"
// Layout
import MainLayout from "../Layout/MainLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "countries/:code", Component: CountryDetail },
      { path: "about", Component: About },
    ]
  },
]);
