import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Posts from '../pages/Posts'
import Projects from '../pages/Projects'
import PostDetail from '../pages/PostDetail'
import ProjectDetail from '../pages/ProjectDetail'
import AboutMe from '../pages/AboutMe'
import RouteContainer from './RouteContainer'
import Cooperation from '../pages/Cooperation'
import Categories from '../pages/Categories'
import Technologies from '../pages/Technologies'
import Keywords from '../pages/Keywords'
import Search from '../pages/Search'
import Signin from '../pages/Signin'
import AddEditPost from '../pages/AddEditPost'
import AddEditProject from '../pages/AddEditProject'
import PrivateRouteContainer from './PrivateRouteContainer'
import Settings from '../pages/Settings'

import AddEditAbout from '../pages/AddEditAbout'
import CategoryList from '../pages/CategoryList'

export default function Routes() {
    const pages=createBrowserRouter([
        {
            path:'/',
            element:<RouteContainer><Home/></RouteContainer>
        },
        
        {
          path:"/signin",
          element:<Signin/>
        },
        {
          path:'/settings',
          element:<PrivateRouteContainer><Settings/></PrivateRouteContainer>
        },
        {
          path:'/posts',
          element:<RouteContainer><Posts/></RouteContainer>
        },
        {
          path:'/posts/:id',
          element:<RouteContainer><PostDetail/></RouteContainer>
        },
        {
          path:'/posts/add',
          element:<PrivateRouteContainer><AddEditPost/></PrivateRouteContainer>
        },
        {
          path:'/posts/edit/:id',
          element:<PrivateRouteContainer><AddEditPost/></PrivateRouteContainer>
        },
        {
          path:'/projects',
          element:<RouteContainer> <Projects/></RouteContainer>
        },
      
        {
          path:'/projects/:id',
          element:<RouteContainer><ProjectDetail/></RouteContainer>
        },
        {
          path:"/projects/add",
          element:<PrivateRouteContainer><AddEditProject/></PrivateRouteContainer>
        },
        {
          path:"/projects/edit/:id",
          element:<PrivateRouteContainer><AddEditProject/></PrivateRouteContainer>
        },
        {
          path:'/about',
          element:<RouteContainer><AboutMe/></RouteContainer>
        },
        {
          path:"/about/add",
          element:<PrivateRouteContainer><AddEditAbout/></PrivateRouteContainer>
        },
        {
          path:"/about/edit/:username",
          element:<PrivateRouteContainer><AddEditAbout/></PrivateRouteContainer>
        },
        {
          path:'/cooperations',
          element:<RouteContainer><Cooperation/></RouteContainer>
        },
        {
          path:'/categories/:name',
          element:<RouteContainer><Categories/></RouteContainer>
        },
        {
          path:'/technologies/:name',
          element:<RouteContainer><Technologies/></RouteContainer>
        },
        {
          path:'/keywords/:name',
          element:<RouteContainer><Keywords/></RouteContainer>
        },
        {
          path:'/search/:query',
          element:<RouteContainer><Search/></RouteContainer>
        },
        {
          path:"category/",
          element:<PrivateRouteContainer><CategoryList/></PrivateRouteContainer>
        }

    ])
  return (
    <RouterProvider router={pages}/>
  )
}
