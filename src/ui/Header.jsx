import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-600 bg-emerald-500 px-4 py-3 uppercase">
      <Link to="/" className="tracking-[0.5rem]">
        Fast Pizza
      </Link>

      <SearchOrder />
      <Username />
    </header>
  )
}
