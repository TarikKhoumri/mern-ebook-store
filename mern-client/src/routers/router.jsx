import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import {SingleBook} from "../shop/SingleBook"
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import SingUp from "../components/SingUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import News from "../dashboard/News";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'/about',
            element:<About/>
        },
        {
            path:'/blog',
            element:<Blog/>
        },
        {
          path:"/book/:id",
          element:<SingleBook/>,
          loader: ({params}) => fetch(`http://localhost:5000/api/books/book/${params.id}`)
        }
      ]
    },
    {
      path:"/admin/dashboard",
      element: <DashboardLayout/>,
      children:[
        {
          path:"/admin/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute>
        },
        {
          path:"/admin/dashboard/upload",
          element: <UploadBooks/>
        },
        {
          path:"/admin/dashboard/manage",
          element: <ManageBooks/>
        },
        {
          path:"/admin/dashboard/edit-books/:id",
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:5000/api/books/book/${params.id}`)
        },
        {
          path:"/admin/dashboard/news",
          element: <News/>
        }
      ]
    },
    {
      path:"sign-up",
      element:<SingUp/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"logout",
      element: <Logout/>
    }
  ]);

export default router;