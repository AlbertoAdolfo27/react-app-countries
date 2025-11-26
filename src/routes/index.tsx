import { createBrowserRouter } from "react-router";
// Pages
import Countries from "../pages/Countries"
import CountryDetail from "../pages/CountryDetail"
import About from "../pages/About"
// Layout
import MainLayout from "../Layout/MainLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Countries },
      { path: "countries/:code", Component: CountryDetail },
      { path: "about", Component: About },
    ]
  },
]);
