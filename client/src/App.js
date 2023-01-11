import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
/**import all components */
    import Username from './components/authentication/Username'
    import Password from './components/authentication/Password'
    import Register from './components/authentication/Registar'
    import Profile from './components/authentication/Profile'
    import Recovery from './components/authentication/Recovery'
    import Reset from './components/authentication/Reset'
    import Pagenotfound from './components/authentication/Pagenotfound'
/**Root routes */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Username/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/password',
        element: <Password/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/recovery',
        element: <Recovery/>
    },
    {
        path: '/reset',
        element: <Reset/>
    },
    {
        path: '/*',
        element: <Pagenotfound/>
    },
        
    
])
 const App = () => {
  return (
    <main>
        <RouterProvider router={router}>

        </RouterProvider>
    </main>
  )
}

export default App
