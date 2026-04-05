import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Menu from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder from './features/order/CreateOrder'
import Order from './features/order/Order'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'

// Loaders
import { MenuLoader } from './features/menu/Menu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:id',
        element: <Order />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
