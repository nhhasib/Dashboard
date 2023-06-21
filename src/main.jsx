import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Components/layout/Dashboard.jsx';
import AuthProvider from './Components/authProvider/AuthProvider.jsx';
import Login from './Components/pages/Login.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ManageItems from './Components/layout/ManageItems.jsx';
import ManageUsers from './Components/layout/ManageUsers.jsx';
import Register from './Components/pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/manageItems',
        element:<ManageItems></ManageItems>
      },
      {
        path: '/manageUsers',
        element:<ManageUsers></ManageUsers>
      },
      {
        path: '/register',
        element:<Register></Register>
      }
    ]
  },
  
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
