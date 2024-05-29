import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import AddTarefa from '../pages/AddTarefa';

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
    ],
  },
]);

export default router;
