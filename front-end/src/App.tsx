import {createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticleListPage } from "./pages/ArticlesListPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./shared/layout";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  
  const routes: RouteObject[] = [
    {path:"/",
      element: <Layout/>,
      errorElement: <NotFoundPage/>,
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
        }
      ]
    }    
]

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
