import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticleListPage } from "./pages/ArticlesListPage";
import { HomePage } from "./pages/HomePage";

import {createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { Layout } from "./shared/layout";

export default function App() {
  
  const routes: RouteObject[] = [
    {path:"/",
      element: <Layout/>,
      children:[{
        path: "/",
        element: <HomePage/>
        },
        {
          path: "/about",
          element: <AboutPage/>
        },
        {
          path: "/articles",
          element: <ArticleListPage/>
        },{
          path: "/article/:name",
          element: <ArticlePage/>
        }]
    }    
]

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
