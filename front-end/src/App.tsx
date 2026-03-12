import {createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import "./App.css";
import { NotFoundPage } from "./presentation/pages/NotFoundPage";
import { Layout } from "./presentation/pages/shared/layout";
import { HomePage } from "./presentation/pages/HomePage";
import { AboutPage } from "./presentation/pages/AboutPage";
import { LoginPage } from "./presentation/pages/Auth/LoginPage";
import { CreateAccountPage } from "./presentation/pages/Auth/CreateAccountPage";
import { ArticleListPage } from "./presentation/pages/Article/ArticlesListPage";
import { articleLoader, ArticlePage } from "./presentation/pages/Article/ArticlePage";


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
          path: "/login",
          element: <LoginPage/>
        },
        {
          path: "/create-account",
          element: <CreateAccountPage/>
        },
        {
          path: "/articles",
          element: <ArticleListPage/>
        },{
          path: "/article/:name",
          element: <ArticlePage/>,
          loader: articleLoader
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
