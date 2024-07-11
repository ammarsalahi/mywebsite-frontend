import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Posts from '../pages/Posts'
import Projects from '../pages/Projects'
import AddEditPost from '../pages/AddEditPost'
import AddEditProject from '../pages/AddEditProject'
import PrivateRoute from './PrivateRoute'
import PostDetail from '../pages/PostDetail'
import ProjectDetail from '../pages/ProjectDetail'

export default function Routes() {
    const pages=createBrowserRouter([
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
          path:'/posts',
          element:<Posts/>
        },
        {
          path:'/projects',
          element:<Projects/>
        },
        {
          path:'/posts/add',
          element:<PrivateRoute><AddEditPost/></PrivateRoute>
        },
        {
          path:'/projects/add',
          element:<PrivateRoute><AddEditProject/></PrivateRoute>
        },
        {
          path:'/posts/edit/:id',
          element:<PrivateRoute><AddEditPost/></PrivateRoute>
        },
        {
          path:'/projects/edit/:id',
          element:<PrivateRoute><AddEditProject/></PrivateRoute>
        },
        {
          path:'/posts/:id',
          element:<PostDetail/>
        },
        {
          path:'/projects/:id',
          element:<ProjectDetail/>
        }

    ])
  return (
    <RouterProvider router={pages}/>
  )
}
