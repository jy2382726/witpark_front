import React from 'react';
import RequireAuth from '../utils/RequireAuth';
import { RouteObject } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/home'));
const Login = React.lazy(() => import('../pages/login'));
const NotFound = React.lazy(() => import('../pages/exception/404'));


// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: (
//             <RequireAuth allowed={true} redirectTo="/login">
//                 <Home />
//             </RequireAuth>
//         ),
//     },
//     {
//         path: '/login',
//         element: (
//             <RequireAuth allowed={false} redirectTo="/">
//                 <Login />
//             </RequireAuth>
//         ),
//     },
//     {
//         path: '*',
//         element: <NotFound />,
//     },
// ]);
// export default router;

let routers: RouteObject[] = [
    {
        path: '/',
        element: (
            <RequireAuth allowed={true} redirectTo="/login">
                <Home />
            </RequireAuth>
        ),
    },
    {
        path: '/login',
        element: (
            <RequireAuth allowed={false} redirectTo="/dashboard">
                <Login />
            </RequireAuth>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routers;

