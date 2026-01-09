import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { AuthFlowRoutes } from './AuthFlowRoutes';

export const router = createBrowserRouter([...AuthFlowRoutes, ...AppRoutes]);
