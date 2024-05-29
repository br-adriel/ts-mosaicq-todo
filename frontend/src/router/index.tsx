import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddTarefa from '../pages/AddTarefa';
import Home from '../pages/Home';
import UpdateTarefa from '../pages/UpdateTarefa';
import Details from '../pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'tasks/add',
        element: <AddTarefa />,
      },
      {
        path: 'tasks/:id',
        element: <Details />,
      },
      {
        path: 'tasks/:id/update',
        element: <UpdateTarefa />,
      },
    ],
  },
]);

export default router;
