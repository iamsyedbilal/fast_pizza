import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

export default function AppLayout() {
  const navigation = useNavigation()
  const loading = navigation.state === 'loading'
  return (
    <div>
      {loading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}
