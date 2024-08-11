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

export default function Routes() {
    const pages=createBrowserRouter([
        {
            path:'/',
            element:<RouteContainer><Home/></RouteContainer>
        },
  
        {
          path:'/posts',
          element:<RouteContainer> <Posts/></RouteContainer>
        },
        {
          path:'/projects',
          element:<RouteContainer> <Projects/></RouteContainer>
        },
        {
          path:'/posts/:id',
          element:<RouteContainer><PostDetail/></RouteContainer>
        },
        {
          path:'/projects/:id',
          element:<RouteContainer><ProjectDetail/></RouteContainer>
        },
        {
          path:'/about',
          element:<RouteContainer><AboutMe/></RouteContainer>
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
        }

    ])
  return (
    <RouterProvider router={pages}/>
  )
}
