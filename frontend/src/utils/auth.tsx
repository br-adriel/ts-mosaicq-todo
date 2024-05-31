import { RouteObject } from 'react-router-dom';
import WithAuth from '../hoc/WithAuth';
import WithoutAuth from '../hoc/WithoutAuth';

export function useAuthOnRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((r) => {
    return {
      ...r,
      element: <WithAuth Page={r.element} />,
    };
  });
}

export function useNoAuthOnRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((r) => {
    return {
      ...r,
      element: <WithoutAuth Page={r.element} />,
    };
  });
}
