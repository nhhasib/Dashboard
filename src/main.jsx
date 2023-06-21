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
import ManageItems from './Components/pages/ManageItems.jsx';
import ManageUsers from './Components/pages/ManageUsers.jsx';
import Register from './Components/pages/Register.jsx';
import Home from './Components/layout/Home.jsx';
import OrderedItem from './Components/pages/OrderedItem.jsx';
import SelectedItem from './Components/pages/SelectedItem.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/',
        element:<Home></Home>
    },
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
      },
      {
        path: '/orderedItem',
        element:<OrderedItem></OrderedItem>
      },
      {
        path: '/selecteditems',
        element:<SelectedItem></SelectedItem>
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
