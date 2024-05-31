import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import WithAuth from '../hoc/WithAuth';
import AddTarefa from '../pages/AddTarefa';
import Details from '../pages/Details';
import ErrorPage from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UpdateTarefa from '../pages/UpdateTarefa';
import { useAuthOnRoutes, useNoAuthOnRoutes } from '../utils/auth';

const taskRoutes: RouteObject[] = [
  {
    path: 'add',
    element: <AddTarefa />,
  },
  {
    path: ':id',
    element: <Details />,
  },
  {
    path: ':id/update',
    element: <UpdateTarefa />,
  },
];

const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <WithAuth Page={<Home />} />,
      },
      {
        path: 'tasks/',
        children: useAuthOnRoutes(taskRoutes),
      },
      {
        path: '',
        children: useNoAuthOnRoutes(authRoutes),
      },
    ],
  },
]);

export default router;
